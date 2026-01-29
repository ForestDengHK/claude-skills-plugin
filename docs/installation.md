# Installation Guide

How to install and manage Claude Code plugins.

## Installing This Plugin

### From GitHub Marketplace (Recommended)

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

### From Local Directory (Development)

```bash
claude --plugin-dir /path/to/claude-skills-plugin
```

## Managing Plugins

### List Installed Plugins

Inside Claude Code:
```
/plugin
```

### Enable/Disable a Plugin

Use the `/plugin` menu to enable or disable plugins.

### Uninstall a Plugin

Use the `/plugin` menu to uninstall plugins.

### Update a Plugin

1. Remove the marketplace: `/plugin marketplace remove fd-skills-marketplace`
2. Re-add it: `/plugin marketplace add ForestDengHK/claude-skills-plugin`
3. Reinstall: `/plugin install fd-skills`

## Post-Installation Setup

### API Keys Configuration

Some skills require API keys. After installation:

```bash
# Create config directory
mkdir -p ~/.claude-skills

# Create .env file
cat > ~/.claude-skills/.env << 'EOF'
# Image Generation - at least ONE required
GOOGLE_API_KEY=your_google_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here
# DASHSCOPE_API_KEY=your_dashscope_api_key_here
EOF
```

### Getting API Keys

| Provider | Where to Get |
|----------|--------------|
| Google AI (Gemini) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| DashScope | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) |

## Verifying Installation

After installation, verify the skills are available:

```bash
# Start Claude Code
claude

# Check if skills appear in the list
# Skills should auto-activate based on your requests
```

Try a test command:

```
Generate a simple image of a sunset
```

If configured correctly, the `image-gen` skill will activate.

## Troubleshooting

### Plugin Not Found

```
Error: Plugin not found
```

**Solution:** Check the GitHub URL or local path is correct.

### Skills Not Loading

**Possible causes:**
1. Plugin not enabled - use `/plugin` menu to enable
2. Restart Claude Code after installation
3. Check skill files have correct `SKILL.md` naming

### API Key Errors

```
Error: Missing API key
```

**Solution:**
1. Create `~/.claude-skills/.env`
2. Add at least one valid API key
3. Restart Claude Code

### Permission Errors

```
Error: Permission denied
```

**Solution:**
```bash
chmod 600 ~/.claude-skills/.env
```

## Installing on Multiple Machines

To use the same plugin on another computer:

1. Install Claude Code
2. Inside Claude Code, run:
   ```
   /plugin marketplace add ForestDengHK/claude-skills-plugin
   /plugin install fd-skills
   ```
3. Configure API keys in `~/.claude-skills/.env`

The plugin installs from GitHub, so all machines get the same version.
