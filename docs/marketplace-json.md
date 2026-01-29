# Marketplace.json Reference

The `marketplace.json` file enables distribution of your plugin through Claude Code's plugin marketplace system. It must be located at `.claude-plugin/marketplace.json`.

## Purpose

- Allows users to install your plugin via `/plugin marketplace add`
- Defines metadata about your plugin collection
- Enables discovery and installation from GitHub repositories

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Marketplace identifier (kebab-case, no spaces) |
| `owner` | object | Owner information |
| `owner.name` | string | Owner's display name |
| `plugins` | array | List of plugins in this marketplace |

## Plugin Entry Fields

Each plugin in the `plugins` array requires:

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `name` | Yes | string | Plugin identifier (must match plugin.json name) |
| `description` | Yes | string | Brief description of the plugin |
| `source` | Yes | string | Relative path to plugin root (e.g., `"./"` or `"./plugins/my-plugin"`) |
| `category` | Yes | string | Plugin category for organization |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Marketplace version (semantic versioning) |
| `description` | string | Overall marketplace description |
| `owner.email` | string | Owner's email address |

## Categories

Common category values:
- `productivity` - Workflow and productivity tools
- `development` - Developer tools and utilities
- `testing` - Testing and validation tools
- `documentation` - Documentation generators
- `integration` - External service integrations

## Complete Example

```json
{
  "name": "my-plugin-marketplace",
  "version": "1.0.0",
  "description": "A collection of useful Claude Code plugins",
  "owner": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "description": "Does something useful",
      "source": "./",
      "category": "productivity"
    }
  ]
}
```

## Multiple Plugins Example

If your repo contains multiple plugins:

```json
{
  "name": "my-plugins-marketplace",
  "version": "1.0.0",
  "owner": {
    "name": "Your Name"
  },
  "plugins": [
    {
      "name": "plugin-one",
      "description": "First plugin",
      "source": "./plugins/plugin-one",
      "category": "development"
    },
    {
      "name": "plugin-two",
      "description": "Second plugin",
      "source": "./plugins/plugin-two",
      "category": "testing"
    }
  ]
}
```

## Installation Flow

Once you have a valid `marketplace.json`:

1. **Add the marketplace:**
   ```
   /plugin marketplace add username/repo-name
   ```

2. **Install a plugin from it:**
   ```
   /plugin install plugin-name
   ```

## Common Errors

### "name: marketplace name can't contain spaces"
Use kebab-case: `"my-marketplace"` not `"My Marketplace"`

### "owner: Invalid input: expected object, received undefined"
Add the required owner object:
```json
"owner": {
  "name": "Your Name"
}
```

### "plugins.0.source: invalid input"
Ensure source is a relative path starting with `./`:
```json
"source": "./"
```

### "plugins.0.category: Required"
Add category field to each plugin entry:
```json
"category": "productivity"
```

## Validation

Your `marketplace.json` must be valid JSON with all required fields. Use the official schema as reference:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json"
}
```
