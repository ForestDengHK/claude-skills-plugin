# Installation Guide

How to install and manage Claude Code plugins.

## Installing This Plugin

### From GitHub

```bash
claude /install-plugin github:forestdeng/claude-skills-plugin
```

### From Local Directory

```bash
claude /install-plugin /path/to/claude-skills-plugin
```

## Managing Plugins

### List Installed Plugins

```bash
claude /plugins
```

### Enable/Disable a Plugin

```bash
# Disable
claude /disable-plugin fd-skills

# Enable
claude /enable-plugin fd-skills
```

### Uninstall a Plugin

```bash
claude /uninstall-plugin fd-skills
```

### Update a Plugin

```bash
# Uninstall and reinstall
claude /uninstall-plugin fd-skills
claude /install-plugin github:forestdeng/claude-skills-plugin
```

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
1. Plugin not enabled - run `claude /enable-plugin fd-skills`
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
2. Run: `claude /install-plugin github:forestdeng/claude-skills-plugin`
3. Configure API keys in `~/.claude-skills/.env`

The plugin installs from GitHub, so all machines get the same version.
