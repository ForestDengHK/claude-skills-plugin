# Plugin.json Reference

The `plugin.json` file is the only **required** file for a Claude Code plugin. It must be located at `.claude-plugin/plugin.json`.

## Minimal Configuration

```json
{
  "name": "my-plugin"
}
```

That's it! The `name` field is the only required field.

## All Available Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `name` | **Yes** | string | Unique plugin identifier (kebab-case) |
| `version` | No | string | Semantic version (e.g., "1.0.0") |
| `description` | No | string | Brief explanation of plugin purpose |
| `author` | No | object | Creator information |
| `repository` | No | string | GitHub URL for source code |
| `homepage` | No | string | Documentation website URL |
| `license` | No | string | License type (MIT, Apache-2.0, etc.) |
| `keywords` | No | array | Tags for discovery/categorization |
| `commands` | No | string/array | Custom path(s) to commands directory |
| `agents` | No | string/array | Custom path(s) to agents directory |
| `hooks` | No | string | Custom path to hooks.json |
| `mcpServers` | No | string | Custom path to MCP config |

## Field Details

### name (Required)

```json
{
  "name": "my-plugin-name"
}
```

- Must be unique across installed plugins
- Use kebab-case (lowercase with hyphens)
- No spaces or special characters
- Used when installing: `/plugin install my-plugin-name`

### version

```json
{
  "version": "1.2.3"
}
```

- Follow semantic versioning: MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### description

```json
{
  "description": "A brief explanation of what this plugin does"
}
```

- Keep it concise (one sentence)
- Shown in plugin listings

### author

```json
{
  "author": {
    "name": "Your Name",
    "email": "your@email.com",
    "url": "https://yourwebsite.com"
  }
}
```

All subfields are optional. Can also be a simple string:

```json
{
  "author": "Your Name <your@email.com>"
}
```

### repository

```json
{
  "repository": "https://github.com/username/plugin-name"
}
```

- Full URL to the source code repository
- Helps users find source and report issues

### homepage

```json
{
  "homepage": "https://docs.example.com/my-plugin"
}
```

- URL to documentation or landing page
- Different from repository (docs vs code)

### license

```json
{
  "license": "MIT"
}
```

Common values: `MIT`, `Apache-2.0`, `GPL-3.0`, `ISC`, `BSD-3-Clause`

### keywords

```json
{
  "keywords": ["testing", "automation", "ci-cd", "deployment"]
}
```

- Array of strings
- Used for plugin discovery and categorization
- Keep relevant and specific

### Custom Paths

Override default component locations:

```json
{
  "commands": "./custom-commands",
  "agents": ["./agents", "./specialized-agents"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./config/mcp.json"
}
```

**Important:** Custom paths **supplement** defaults, they don't replace them.

## Complete Example

```json
{
  "name": "fd-skills",
  "version": "1.0.0",
  "description": "AI image generation and article illustration skills for Claude Code",

  "author": {
    "name": "Forest Deng",
    "email": "forest.jinying.denghk@outlook.com",
    "url": "https://forestdeng.com"
  },

  "repository": "https://github.com/ForestDengHK/claude-skills-plugin",
  "homepage": "https://forestdeng.com/claude-skills",
  "license": "MIT",

  "keywords": [
    "image-generation",
    "article-illustration",
    "ai-news",
    "gemini",
    "openai",
    "dalle"
  ]
}
```

## Path Variables

In hooks and MCP configurations, use `$PLUGIN_ROOT` for portable paths:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "bash $PLUGIN_ROOT/scripts/validate.sh"
      }]
    }]
  }
}
```

This ensures paths work regardless of where the plugin is installed.

## Validation

Your `plugin.json` must be valid JSON. Common errors:

- Missing commas between fields
- Trailing commas (not allowed in JSON)
- Unquoted strings
- Single quotes (must use double quotes)

Use a JSON validator if you encounter issues.
