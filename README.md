# FD Skills - Claude Code Plugin

A collection of Claude Code skills for AI image generation and article illustration.

## Installation

```bash
claude /install-plugin github:forestdeng/claude-skills-plugin
```

## Skills Included

| Skill | Description | Trigger |
|-------|-------------|---------|
| `image-gen` | AI image generation with Google/OpenAI/DashScope APIs | "generate image", "create image", "draw" |
| `article-illustrator` | Analyze articles and generate illustrations with Type × Style | "illustrate article", "add images to article" |
| `ai-news-to-blog` | Research AI news and draft blog posts | "find AI news", "research AI updates" |

## Configuration

After installation, configure your API keys:

```bash
mkdir -p ~/.claude-skills
cat > ~/.claude-skills/.env << 'EOF'
# At least ONE key required for image generation
GOOGLE_API_KEY=your_google_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here
# DASHSCOPE_API_KEY=your_dashscope_api_key_here
EOF
```

### Get API Keys

| Provider | URL |
|----------|-----|
| Google AI (Gemini) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| DashScope | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) |

## Usage Examples

### Generate Images

```bash
# Simple image
/image-gen --prompt "A sunset over mountains" --image sunset.png

# With aspect ratio
/image-gen --prompt "A landscape" --image landscape.png --ar 16:9

# High quality for diagrams
/image-gen --prompt "System architecture diagram" --image arch.png --quality 2k --imageSize 4K
```

### Illustrate Articles

```bash
# Auto-analyze and illustrate
/article-illustrator path/to/article.md

# Specify style
/article-illustrator article.md --type infographic --style blueprint
```

## License

MIT
