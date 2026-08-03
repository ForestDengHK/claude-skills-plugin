---
name: image-gen
description: AI image generation with Google, Replicate, OpenAI, and DashScope APIs. Two-tier cost optimization - use Google for text/diagrams, Replicate FLUX for covers/aesthetics. Supports text-to-image, reference images, aspect ratios.
---

# Image Generation (AI SDK)

Official API-based image generation. Supports Google, Replicate, OpenAI, and DashScope (阿里通义万象) providers.

## Two-Tier Cost Optimization

**The key insight**: Not all images need the same engine.

| Image Type | Provider | Model | Resolution | Cost | Best For |
|------------|----------|-------|------------|------|----------|
| Diagrams, text, labels | Google | Gemini 2.5 Flash | 1K (default) | $0.039 | Infographics, architecture, any image with text |
| Covers, abstract, aesthetic | Replicate | FLUX Schnell | - | $0.003 | Hero images, atmospheric visuals, no text |
| Premium high-res | Google | Gemini 2.5 Flash | 2K | $0.039 | When you need larger source |
| Maximum quality | Google | Gemini 3 Pro | 4K | $0.24 | Premium output, print quality |

**Rule of thumb**: If the image has readable text → Google. If it's purely visual → Replicate.

## Recommended Model for New Projects (2026)

For new projects starting in 2026, use `gemini-3.1-flash-image-preview` instead of the default `gemini-2.5-flash-image`:

| Feature | gemini-2.5-flash-image | gemini-3.1-flash-image-preview |
|---------|----------------------|-------------------------------|
| Resolution | Max 1K | 512px to 4K |
| Text rendering | Good | ~90% accuracy (improved) |
| Quality | Good | Near-Pro quality |
| Speed | Fast | 4-6 seconds |
| Cost (1K) | $0.039 | $0.067 |
| Free tier | No | 5,000 prompts/month (AI Studio) |
| Deprecation | **2026-10-02** | Active |

**Usage:**
```bash
# Via CLI flag
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "..." --image out.png --model gemini-3.1-flash-image-preview

# Via environment variable
export GOOGLE_IMAGE_MODEL=gemini-3.1-flash-image-preview
```

**Note:** The default model (`gemini-2.5-flash-image`) still works but is scheduled for deprecation on 2026-10-02. Plan to migrate before that date.

## Script Directory

**Agent Execution**:
1. `SKILL_DIR` = this SKILL.md file's directory
2. Script path = `${SKILL_DIR}/scripts/main.ts`

## Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .claude-skills/image-gen/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.claude-skills/image-gen/EXTEND.md" && echo "user"
```

┌──────────────────────────────────────────────────┬───────────────────┐
│                       Path                       │     Location      │
├──────────────────────────────────────────────────┼───────────────────┤
│ .claude-skills/image-gen/EXTEND.md               │ Project directory │
├──────────────────────────────────────────────────┼───────────────────┤
│ $HOME/.claude-skills/image-gen/EXTEND.md         │ User home         │
└──────────────────────────────────────────────────┴───────────────────┘

┌───────────┬───────────────────────────────────────────────────────────────────────────┐
│  Result   │                                  Action                                   │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Found     │ Read, parse, apply settings                                               │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Not found │ Use defaults                                                              │
└───────────┴───────────────────────────────────────────────────────────────────────────┘

**EXTEND.md Supports**: Default provider | Default quality | Default aspect ratio

## Usage

```bash
# Diagram with text labels → Google (default, best for text)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Architecture diagram showing..." \
  --image diagram.png --quality 2k

# Cover image (no text) → Replicate (13x cheaper)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Abstract watercolor sunset, atmospheric, no text" \
  --image cover.webp --provider replicate --ar 16:9

# Premium 4K for maximum quality
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Detailed infographic..." \
  --image out.png --model gemini-3-pro-image-preview --imageSize 4K

# With reference images (Google multimodal only)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Make blue" --image out.png --ref source.png

# From prompt files
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --promptfiles system.md content.md --image out.png
```

## Options

| Option | Description |
|--------|-------------|
| `--prompt <text>`, `-p` | Prompt text |
| `--promptfiles <files...>` | Read prompt from files (concatenated) |
| `--image <path>` | Output image path (required) |
| `--provider google\|replicate\|openai\|dashscope` | Force provider (default: google) |
| `--model <id>`, `-m` | Model ID |
| `--ar <ratio>` | Aspect ratio (e.g., `16:9`, `1:1`, `4:3`) |
| `--size <WxH>` | Size (e.g., `1024x1024`) |
| `--quality normal\|2k` | Quality preset (default: 2k) |
| `--imageSize 1K\|2K\|4K` | Image size for Google (default: from quality) |
| `--ref <files...>` | Reference images (Google multimodal only) |
| `--n <count>` | Number of images |
| `--json` | JSON output |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Google API key |
| `REPLICATE_API_TOKEN` | Replicate API token (for FLUX Schnell) |
| `OPENAI_API_KEY` | OpenAI API key |
| `DASHSCOPE_API_KEY` | DashScope API key (阿里云) |
| `GOOGLE_IMAGE_MODEL` | Google model override (default: gemini-2.5-flash-image) |
| `REPLICATE_IMAGE_MODEL` | Replicate model override (default: black-forest-labs/flux-schnell) |
| `OPENAI_IMAGE_MODEL` | OpenAI model override |
| `DASHSCOPE_IMAGE_MODEL` | DashScope model override (default: z-image-turbo) |
| `GOOGLE_BASE_URL` | Custom Google endpoint |
| `OPENAI_BASE_URL` | Custom OpenAI endpoint |
| `DASHSCOPE_BASE_URL` | Custom DashScope endpoint |

**Load Priority**: CLI args > env vars > `<cwd>/.claude-skills/.env` > `~/.claude-skills/.env`

## Provider Selection Guide

| Image Content | Recommended Provider | Why |
|---------------|---------------------|-----|
| Diagrams with text labels | Google | Excellent text rendering |
| Infographics with numbers | Google | Precise text/number display |
| Architecture/framework diagrams | Google | Clean lines + readable labels |
| Cover images (no text) | Replicate | 13x cheaper, great aesthetics |
| Abstract/atmospheric visuals | Replicate | Fast, creative, very cheap |
| Hero banners (no text) | Replicate | Cost-effective for large images |
| Premium 4K output | Google (gemini-3-pro) | Best resolution available |

**Auto-detection**: If `--provider` not specified:
1. Google if GOOGLE_API_KEY available (best for text)
2. Replicate if REPLICATE_API_TOKEN available
3. OpenAI if OPENAI_API_KEY available
4. DashScope if DASHSCOPE_API_KEY available

## Quality Presets

| Preset | Google imageSize | OpenAI Size | Use Case |
|--------|------------------|-------------|----------|
| `normal` | 1K | 1024px | Standard web images (default) |
| `2k` | 1K (override with --imageSize 2K) | 2048px | Larger source needed |

**Default**: Google now uses **1K resolution** by default for cost optimization.
- 1K source → compress to 1200-1600px WebP = visually identical for web
- Override with `--imageSize 2K` or `--imageSize 4K` when needed

**Google imageSize**: Can be overridden with `--imageSize 1K|2K|4K`

**Cost Impact (Google Gemini 2.5 Flash)**:
- 1K (default): $0.039/image
- 2K: $0.039/image (same cost, just larger)
- For 4K: use `--model gemini-3-pro-image-preview --imageSize 4K` ($0.24)

## Text Clarity Guidelines

**For images with text, labels, or diagrams**, use Google provider (1K default is sufficient):

```bash
# Diagrams/infographics with text labels (1K default)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "..." --image out.png

# For larger source when needed
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "..." --image out.png --imageSize 2K

# For maximum quality (premium)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "..." --image out.png --model gemini-3-pro-image-preview --imageSize 4K
```

| Image Type | Recommended Settings | Provider | Cost |
|------------|---------------------|----------|------|
| Diagrams with text | (default - 1K) | Google | $0.039 |
| Large/detailed diagrams | `--imageSize 2K` | Google | $0.039 |
| Premium 4K output | `--model gemini-3-pro-image-preview --imageSize 4K` | Google | $0.24 |
| Cover images (no text) | `--provider replicate` | Replicate | $0.003 |
| Abstract/Scene | `--provider replicate` | Replicate | $0.003 |

**Note**: Higher resolution = larger file size. Convert to WebP after generation for web optimization.

## Aspect Ratios

**Google**: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`

**Replicate FLUX**: `1:1`, `16:9`, `21:9`, `3:2`, `2:3`, `4:5`, `5:4`, `3:4`, `4:3`, `9:16`, `9:21`

Unsupported ratios are automatically mapped to the closest available option.

## Generation Mode

**Default**: Sequential generation (one image at a time). This ensures stable output and easier debugging.

**Parallel Generation**: Only use when user explicitly requests parallel/concurrent generation.

| Mode | When to Use |
|------|-------------|
| Sequential (default) | Normal usage, single images, small batches |
| Parallel | User explicitly requests, large batches (10+) |

## Error Handling

- Missing API key → error with setup instructions
- Generation failure → auto-retry once
- Invalid aspect ratio → warning, proceed with closest match
- Reference images with non-Google provider → warning, ignore refs

## Example: Blog Post Workflow

Typical blog post image generation (82% cost savings):

```bash
# Cover image (no text) → Replicate ($0.003)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Abstract visualization of data streams converging, dark teal background" \
  --image cover.webp --provider replicate --ar 16:9

# Article diagrams (with text) → Google 1K ($0.039 each)
npx -y bun ${SKILL_DIR}/scripts/main.ts \
  --prompt "Infographic showing MDM architecture with labeled components" \
  --image diagram1.png

# Convert to WebP for web (1K source → 1600px WebP is plenty sharp)
npx -y sharp-cli -i diagram1.png -o diagram1.webp -f webp -q 90 -- resize 1600
rm diagram1.png
```

**Old cost** (all Gemini 3 Pro at 2K): ~$0.87/post
**New cost** (Replicate covers + Gemini 2.5 Flash 1K): ~$0.16/post

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
