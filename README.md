# FD Skills - Claude Code Plugin

A collection of 21 Claude Code skills for productivity, AI image generation, content creation, and more.

## Installation

```bash
claude /install-plugin github:ForestDengHK/claude-skills-plugin
```

## Skills Included

| Skill | Description |
|-------|-------------|
| `agent-browser` | Automates browser interactions for web testing, form filling, screenshots |
| `ai-news-to-blog` | Research AI news and draft blog posts |
| `article-illustrator` | Analyze articles and generate illustrations with Type × Style |
| `changelog-generator` | Create user-facing changelogs from git commits |
| `competitive-ads-extractor` | Extract and analyze competitors' ads from ad libraries |
| `content-research-writer` | Research and write high-quality content with citations |
| `developer-growth-analysis` | Analyze coding patterns and identify areas for improvement |
| `domain-name-brainstormer` | Generate creative domain name ideas and check availability |
| `file-organizer` | Intelligently organize files and folders |
| `image-enhancer` | Improve image quality - resolution, sharpness, clarity |
| `image-gen` | AI image generation with Google/OpenAI/DashScope APIs |
| `invoice-organizer` | Organize invoices and receipts for tax preparation |
| `lead-research-assistant` | Identify high-quality leads for your business |
| `meeting-insights-analyzer` | Analyze meeting transcripts for insights and feedback |
| `planning-with-files` | Use markdown files for planning and progress tracking |
| `raffle-winner-picker` | Pick random winners from lists for giveaways |
| `react-best-practices` | React and Next.js performance optimization guidelines |
| `skill-share` | Create and share Claude skills on Slack |
| `smart-commit` | Generate conventional commit messages with proper scope |
| `template-skill` | Template for creating new skills |
| `video-downloader` | Download videos from YouTube and other platforms |

## Configuration

Some skills require API keys. After installation:

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

## Documentation

See the [docs/](docs/) folder for detailed documentation:

- [Installation Guide](docs/installation.md)
- [Plugin Structure](docs/plugin-structure.md)
- [Plugin.json Reference](docs/plugin-json.md)
- [Components Guide](docs/components.md)

## License

MIT
