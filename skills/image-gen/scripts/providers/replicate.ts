import type { CliArgs } from "../types";

/**
 * Replicate provider for FLUX Schnell - optimized for fast, cheap aesthetic images.
 * Best for: Covers, abstract visuals, atmospheric images WITHOUT text.
 * Cost: ~$0.003 per image (44x cheaper than Gemini 3 Pro)
 * NOT recommended for: Diagrams, infographics, or any image with text labels.
 */

export function getDefaultModel(): string {
  return process.env.REPLICATE_IMAGE_MODEL || "black-forest-labs/flux-schnell";
}

function getReplicateApiToken(): string | null {
  return process.env.REPLICATE_API_TOKEN || null;
}

// FLUX Schnell supported aspect ratios
const FLUX_ASPECT_RATIOS = [
  "1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"
] as const;

function mapAspectRatio(ar: string | null): string {
  if (!ar) return "16:9"; // Default for covers/banners

  // Check if exact match
  if (FLUX_ASPECT_RATIOS.includes(ar as any)) {
    return ar;
  }

  // Map common ratios
  const mappings: Record<string, string> = {
    "2.35:1": "21:9",
    "1.85:1": "16:9",
    "1.33:1": "4:3",
    "0.75:1": "3:4",
    "0.56:1": "9:16",
  };

  if (mappings[ar]) {
    return mappings[ar];
  }

  // Try to find closest match by ratio value
  const [w, h] = ar.split(":").map(Number);
  if (w && h) {
    const targetRatio = w / h;
    let closest = "16:9";
    let closestDiff = Infinity;

    for (const ratio of FLUX_ASPECT_RATIOS) {
      const [rw, rh] = ratio.split(":").map(Number);
      const r = rw / rh;
      const diff = Math.abs(r - targetRatio);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = ratio;
      }
    }
    return closest;
  }

  return "16:9";
}

function detectOutputFormat(imagePath: string): "webp" | "jpg" | "png" {
  const ext = imagePath.toLowerCase().split(".").pop();
  if (ext === "webp") return "webp";
  if (ext === "jpg" || ext === "jpeg") return "jpg";
  return "png";
}

interface ReplicatePrediction {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string[] | string;
  error?: string;
}

async function createPrediction(
  model: string,
  input: Record<string, unknown>,
  apiToken: string
): Promise<ReplicatePrediction> {
  // For official models, use the simpler endpoint
  const isOfficialModel = model.startsWith("black-forest-labs/");

  const url = isOfficialModel
    ? `https://api.replicate.com/v1/models/${model}/predictions`
    : "https://api.replicate.com/v1/predictions";

  const body = isOfficialModel
    ? { input }
    : { version: model, input };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
      "Prefer": "wait", // Sync mode - wait for result
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Replicate API error (${res.status}): ${err}`);
  }

  return (await res.json()) as ReplicatePrediction;
}

async function waitForPrediction(
  predictionId: string,
  apiToken: string,
  maxWaitMs: number = 60000
): Promise<ReplicatePrediction> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const res = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          "Authorization": `Bearer ${apiToken}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Replicate API error (${res.status}): ${err}`);
    }

    const prediction = (await res.json()) as ReplicatePrediction;

    if (prediction.status === "succeeded") {
      return prediction;
    }

    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(`Prediction ${prediction.status}: ${prediction.error || "Unknown error"}`);
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error("Prediction timed out");
}

async function downloadImage(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

export async function generateImage(
  prompt: string,
  model: string,
  args: CliArgs
): Promise<Uint8Array> {
  const apiToken = getReplicateApiToken();
  if (!apiToken) {
    throw new Error(
      "REPLICATE_API_TOKEN is required for Replicate provider.\n" +
      "Get your token at https://replicate.com/account/api-tokens\n" +
      "Add to ~/.claude-skills/.env: REPLICATE_API_TOKEN=r8_xxx"
    );
  }

  const aspectRatio = mapAspectRatio(args.aspectRatio);
  const outputFormat = args.imagePath ? detectOutputFormat(args.imagePath) : "webp";

  // FLUX Schnell input parameters
  const input: Record<string, unknown> = {
    prompt: prompt,
    aspect_ratio: aspectRatio,
    output_format: outputFormat,
    output_quality: 90,
    num_outputs: 1,
    disable_safety_checker: false,
    // go_fast mode for even faster generation (uses fp8 quantization)
    go_fast: true,
  };

  console.log("Generating image with Replicate FLUX...", {
    model,
    aspectRatio,
    outputFormat,
  });

  // Create prediction with sync mode (Prefer: wait header)
  let prediction = await createPrediction(model, input, apiToken);

  // If not completed immediately (sync mode didn't work), poll
  if (prediction.status !== "succeeded") {
    prediction = await waitForPrediction(prediction.id, apiToken);
  }

  // Get output URL
  const output = Array.isArray(prediction.output)
    ? prediction.output[0]
    : prediction.output;

  if (!output) {
    throw new Error("No output from Replicate");
  }

  console.log("Generation completed, downloading...");

  // Download the image
  const imageData = await downloadImage(output);

  console.log("Download completed.");

  return imageData;
}
