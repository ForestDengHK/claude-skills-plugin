# Plugin Structure Guide

This document explains the complete structure of a Claude Code plugin.

## Directory Layout

```
plugin-name/
│
├── .claude-plugin/              # REQUIRED: Plugin config directory
│   ├── plugin.json              # REQUIRED: Plugin manifest (only required file)
│   └── marketplace.json         # OPTIONAL: For marketplace distribution
│
├── skills/                      # Auto-discovered skills directory
│   ├── skill-one/
│   │   ├── SKILL.md             # Required for each skill
│   │   └── scripts/             # Optional: supporting files
│   └── skill-two/
│       ├── SKILL.md
│       └── references/          # Optional: reference docs
│
├── commands/                    # Optional: Slash commands (auto-discovered)
│   └── my-command.md            # Creates /my-command
│
├── agents/                      # Optional: Custom subagents (auto-discovered)
│   └── my-agent.md
│
├── hooks/                       # Optional: Event automation
│   ├── hooks.json               # Hook configuration
│   └── scripts/                 # Hook scripts
│
├── .mcp.json                    # Optional: MCP server configs
│
├── scripts/                     # Optional: Shared utilities
│
└── README.md                    # Recommended: Documentation
```

## What Each Directory Does

### `.claude-plugin/` (Required)

Contains the plugin manifest. This is the **only required directory**.

```
.claude-plugin/
└── plugin.json    # Plugin configuration and metadata
```

### `skills/` (Optional)

Contains skill definitions. Each skill lives in its own subdirectory with a `SKILL.md` file.

```
skills/
├── image-gen/
│   ├── SKILL.md           # Skill definition (required)
│   ├── scripts/           # Supporting scripts (optional)
│   └── references/        # Reference documentation (optional)
└── another-skill/
    └── SKILL.md
```

**Auto-discovery:** Claude Code automatically finds all `SKILL.md` files in subdirectories.

### `commands/` (Optional)

Contains slash command definitions. Each `.md` file becomes a command.

```
commands/
├── deploy.md        # Creates /deploy command
├── review.md        # Creates /review command
└── test.md          # Creates /test command
```

**Auto-discovery:** All `.md` files are automatically registered as commands.

### `agents/` (Optional)

Contains custom subagent definitions for specialized tasks.

```
agents/
├── code-reviewer.md
├── test-generator.md
└── refactorer.md
```

**Auto-discovery:** All `.md` files are automatically available as agents.

### `hooks/` (Optional)

Contains event automation configuration and scripts.

```
hooks/
├── hooks.json       # Hook configuration
└── scripts/         # Scripts executed by hooks
    ├── validate.sh
    └── format.sh
```

### `.mcp.json` (Optional)

MCP (Model Context Protocol) server configurations for external integrations.

### `scripts/` (Optional)

Shared utility scripts used by skills, commands, or hooks.

## Naming Conventions

| Component | Convention | Example |
|-----------|------------|---------|
| Plugin name | kebab-case | `my-awesome-plugin` |
| Skill directories | kebab-case | `image-gen/`, `api-testing/` |
| Command files | kebab-case | `run-tests.md`, `deploy-prod.md` |
| Agent files | kebab-case | `code-reviewer.md` |
| Script files | kebab-case | `validate-input.sh` |

## Auto-Discovery Rules

Claude Code automatically discovers components:

| Component | Location | Pattern |
|-----------|----------|---------|
| Skills | `skills/*/` | `SKILL.md` in each subdirectory |
| Commands | `commands/` | Any `.md` file |
| Agents | `agents/` | Any `.md` file |
| Hooks | `hooks/` | `hooks.json` |
| MCP Servers | Plugin root | `.mcp.json` |

**No manual registration needed** - just place files in the correct location!

## Minimal Plugin Example

The simplest possible plugin:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json    # {"name": "my-plugin"}
└── skills/
    └── my-skill/
        └── SKILL.md
```

## Full-Featured Plugin Example

A plugin using all component types:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── skill-one/
│   │   └── SKILL.md
│   └── skill-two/
│       └── SKILL.md
├── commands/
│   ├── deploy.md
│   └── test.md
├── agents/
│   └── specialist.md
├── hooks/
│   ├── hooks.json
│   └── scripts/
│       └── validate.sh
├── .mcp.json
├── scripts/
│   └── utils.sh
└── README.md
```
