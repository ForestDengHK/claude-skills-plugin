# Plugin Components Guide

Claude Code plugins can contain five types of components. This document explains each one.

## Overview

| Component | Purpose | Auto-triggered? | User-invoked? |
|-----------|---------|-----------------|---------------|
| **Skills** | Contextual knowledge & workflows | Yes | Via `/skill-name` |
| **Commands** | User slash commands | No | Yes, via `/command` |
| **Agents** | Specialized subagents | Yes (by Claude) | No |
| **Hooks** | Event automation | Yes | No |
| **MCP Servers** | External integrations | Yes | No |

---

## 1. Skills

**Location:** `skills/<skill-name>/SKILL.md`

**Purpose:** Provide contextual knowledge and workflows that Claude activates automatically based on task context.

### How Skills Work

1. Claude reads the `description` field in each SKILL.md frontmatter
2. When a user's task matches a description, Claude loads that skill
3. Claude follows the instructions in the skill

### SKILL.md Format

```markdown
---
name: my-skill
description: When to use this skill - triggers automatic activation
version: 1.0.0
---

# My Skill

Instructions for Claude to follow when this skill is activated...

## Workflow

1. Step one
2. Step two
3. Step three

## References

Additional information, examples, etc.
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Skill identifier (kebab-case) |
| `description` | Yes | When to activate (matched against user requests) |
| `version` | No | Skill version |

### Supporting Files

Skills can include additional files:

```
skills/my-skill/
├── SKILL.md              # Required
├── scripts/              # Optional: executable scripts
│   └── helper.ts
├── references/           # Optional: reference documentation
│   ├── api-docs.md
│   └── examples.md
└── templates/            # Optional: template files
    └── config.template
```

### Example Skill

```markdown
---
name: image-gen
description: AI image generation with OpenAI, Google and DashScope APIs. Use when user asks to generate, create, or draw images.
---

# Image Generation

Generate images using AI APIs.

## Usage

\`\`\`bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image cat.png
\`\`\`

## Options

| Option | Description |
|--------|-------------|
| `--prompt` | Image description |
| `--image` | Output file path |
| `--provider` | API provider (google, openai, dashscope) |
```

---

## 2. Commands

**Location:** `commands/<command-name>.md`

**Purpose:** User-invocable slash commands for specific actions.

### How Commands Work

1. Each `.md` file in `commands/` becomes a slash command
2. File name determines command name: `deploy.md` → `/deploy`
3. User types `/command-name` to invoke

### Command Format

```markdown
---
name: command-name
description: What this command does
---

# Command Name

Instructions for Claude when user runs this command...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Command name (without slash) |
| `description` | Yes | Brief description shown in help |

### Example Command

```markdown
---
name: generate-cover
description: Generate a cover image for a blog post
---

# Generate Cover Image

When the user runs /generate-cover:

1. Ask for the blog post title or path
2. Read and analyze the content
3. Generate a relevant cover image using the image-gen skill
4. Save to the post's directory as cover.webp
```

### Command vs Skill

| Aspect | Command | Skill |
|--------|---------|-------|
| Invocation | Explicit (`/command`) | Automatic (context-based) |
| Purpose | Specific action | Contextual knowledge |
| User interaction | Direct | Indirect |

---

## 3. Agents

**Location:** `agents/<agent-name>.md`

**Purpose:** Specialized subagents for complex, focused tasks.

### How Agents Work

1. Claude delegates specific subtasks to agents via the Task tool
2. Agents have focused expertise and capabilities
3. Multiple agents can work in parallel

### Agent Format

```markdown
---
description: Agent's role and expertise
capabilities:
  - Specific capability 1
  - Specific capability 2
  - Specific capability 3
---

# Agent Name

Detailed instructions defining the agent's behavior...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `description` | Yes | Agent's role and when to use |
| `capabilities` | No | List of specific abilities |

### Example Agent

```markdown
---
description: Optimizes images for web - compresses, resizes, converts formats
capabilities:
  - Compress PNG/JPG images
  - Convert to WebP format
  - Resize for responsive breakpoints
  - Optimize for Core Web Vitals
---

# Image Optimizer Agent

You are an image optimization specialist. When given images:

1. Analyze current file sizes and formats
2. Determine optimal compression settings
3. Convert to WebP where appropriate
4. Generate responsive sizes if needed
5. Report size savings achieved
```

---

## 4. Hooks

**Location:** `hooks/hooks.json`

**Purpose:** Automated actions triggered by Claude Code events.

### How Hooks Work

1. Define event triggers in `hooks.json`
2. When events occur, hooks execute automatically
3. Can run scripts, commands, or other actions

### Available Events

| Event | When It Fires |
|-------|---------------|
| `PreToolUse` | Before a tool executes |
| `PostToolUse` | After a tool executes |
| `Stop` | When Claude finishes a response |
| `SubagentStop` | When a subagent completes |
| `SessionStart` | When a session begins |
| `SessionEnd` | When a session ends |
| `UserPromptSubmit` | When user sends a message |
| `PreCompact` | Before context compaction |
| `Notification` | When notifications occur |

### hooks.json Format

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "bash $PLUGIN_ROOT/hooks/scripts/validate.sh",
          "timeout": 30
        }
      ]
    }
  ],
  "PostToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "echo 'Command completed'"
        }
      ]
    }
  ]
}
```

### Hook Configuration Fields

| Field | Description |
|-------|-------------|
| `matcher` | Regex pattern to match tool names |
| `hooks` | Array of hook actions |
| `type` | Hook type: `command` |
| `command` | Shell command to execute |
| `timeout` | Max execution time (seconds) |

### Example: Lint on File Write

```json
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [
        {
          "type": "command",
          "command": "eslint --fix $CLAUDE_FILE_PATH",
          "timeout": 30
        }
      ]
    }
  ]
}
```

---

## 5. MCP Servers

**Location:** `.mcp.json` (at plugin root)

**Purpose:** External tool integrations via Model Context Protocol.

### How MCP Servers Work

1. Define server configurations in `.mcp.json`
2. Servers start automatically when plugin is enabled
3. Provide additional tools to Claude

### .mcp.json Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["$PLUGIN_ROOT/servers/my-server.js"],
      "env": {
        "API_KEY": "${MY_API_KEY}"
      }
    }
  }
}
```

### Configuration Fields

| Field | Description |
|-------|-------------|
| `command` | Executable to run |
| `args` | Command arguments |
| `env` | Environment variables |

### Environment Variable Syntax

- `$PLUGIN_ROOT` - Plugin installation directory
- `${VAR_NAME}` - User's environment variable

### Example: Database Server

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

---

## Choosing the Right Component

| Need | Use |
|------|-----|
| Contextual knowledge that activates automatically | **Skill** |
| User-triggered action with specific workflow | **Command** |
| Specialized subtask delegation | **Agent** |
| Automatic response to events | **Hook** |
| External API/database integration | **MCP Server** |
