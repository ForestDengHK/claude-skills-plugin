# FD Skills - Claude Code Plugin

A collection of Claude Code skills for AI image generation and article illustration.

## Installation

### Option 1: Via Marketplace (Recommended)

Inside Claude Code, run:
```
/plugin marketplace add ForestDengHK/claude-skills-plugin
/plugin install fd-skills
```

Or use the interactive menu:
1. Run `/plugin`
2. Select "Add Marketplace"
3. Enter: `ForestDengHK/claude-skills-plugin`
4. Then install `fd-skills` from the marketplace list

### Option 2: Load Directly (Development)

```bash
# Clone the repo
git clone https://github.com/ForestDengHK/claude-skills-plugin.git ~/claude-skills-plugin

# Start Claude Code with the plugin
claude --plugin-dir ~/claude-skills-plugin
```

### Option 3: Copy Individual Skills

```bash
# Clone the repo
git clone https://github.com/ForestDengHK/claude-skills-plugin.git /tmp/fd-skills

# Copy only the skill you want
cp -r /tmp/fd-skills/skills/image-gen ~/.claude/skills/

# Clean up
rm -rf /tmp/fd-skills
```

## Skills Included

| Skill | Description |
|-------|-------------|
| `image-gen` | AI image generation with Google/OpenAI/DashScope APIs |
| `article-illustrator` | Analyze articles and generate illustrations with Type × Style |
| `ai-news-to-blog` | Research AI news and draft blog posts |

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
/fd-skills:image-gen --prompt "A sunset over mountains" --image sunset.png

# With aspect ratio
/fd-skills:image-gen --prompt "A landscape" --image landscape.png --ar 16:9
```

### Illustrate Articles

```bash
# Auto-analyze and illustrate
/fd-skills:article-illustrator path/to/article.md

# Specify style
/fd-skills:article-illustrator article.md --type infographic --style blueprint
```

## Documentation

See the [docs/](docs/) folder for detailed documentation:

- [Installation Guide](docs/installation.md)
- [Plugin Structure](docs/plugin-structure.md)
- [Plugin.json Reference](docs/plugin-json.md)
- [Components Guide](docs/components.md)

## License

MIT
