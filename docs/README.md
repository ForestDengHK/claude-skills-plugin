# Documentation Index

Welcome to the FD Skills plugin documentation.

## Quick Links

| Document | Description |
|----------|-------------|
| [Installation Guide](installation.md) | How to install and configure the plugin |
| [Plugin Structure](plugin-structure.md) | Understanding the directory layout |
| [Plugin.json Reference](plugin-json.md) | All manifest configuration options |
| [Marketplace.json Reference](marketplace-json.md) | Marketplace distribution configuration |
| [Components Guide](components.md) | Skills, commands, agents, hooks, MCP servers |

## Getting Started

1. **Install the plugin:**
   ```
   /plugin marketplace add ForestDengHK/claude-skills-plugin
   /plugin install fd-skills
   ```

2. **Configure API keys:**
   ```bash
   mkdir -p ~/.claude-skills
   echo "GOOGLE_API_KEY=your_key" > ~/.claude-skills/.env
   ```

3. **Start using:**
   ```
   Generate an image of a mountain landscape
   ```

## Skills in This Plugin

### image-gen

AI-powered image generation using Google Gemini, OpenAI DALL-E, or DashScope APIs.

**Triggers:** "generate image", "create image", "draw"

**Example:**
```
Generate a cover image for my blog post about AI
```

### article-illustrator

Analyzes articles and generates contextual illustrations using a Type × Style framework.

**Triggers:** "illustrate article", "add images to article", "为文章配图"

**Example:**
```
/article-illustrator posts/my-article.md
```

### ai-news-to-blog

Researches latest AI news and helps draft blog posts.

**Triggers:** "find AI news", "research AI updates"

## For Plugin Developers

If you want to create your own plugins, read:

1. [Plugin Structure](plugin-structure.md) - Directory layout
2. [Plugin.json Reference](plugin-json.md) - Configuration options
3. [Components Guide](components.md) - Different component types

## Support

- **Issues:** [GitHub Issues](https://github.com/ForestDengHK/claude-skills-plugin/issues)
- **Source:** [GitHub Repository](https://github.com/ForestDengHK/claude-skills-plugin)
