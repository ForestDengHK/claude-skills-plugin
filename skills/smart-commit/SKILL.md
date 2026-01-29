---
name: smart-commit
description: Analyzes staged changes, warns about cross-repo commits, and generates conventional commit messages with proper scope. Use when ready to commit changes.
---

# Smart Commit

This skill analyzes your staged changes and generates properly formatted commit messages following conventional commits with project-specific scopes.

## When to Use This Skill

- When you're ready to commit changes
- When you want to verify changes are scoped correctly
- When you need help writing a descriptive commit message
- User says "commit", "create commit", or "/smart-commit"

## Commit Format

```
<type>[|type2](Scope): <short description>

- bullet point 1
- bullet point 2
- bullet point 3
```

### Types (can combine with `|` when necessary)

| Type | Use When |
|------|----------|
| `feat` | Adding new functionality |
| `fix` | Fixing a bug |
| `test` | Adding or modifying tests |
| `docs` | Documentation changes |
| `refactor` | Code restructuring without behavior change |
| `chore` | Maintenance, cleanup, removing unused code |
| `perf` | Performance improvements |

### Scopes (for kgd-digital-human repo)

| Scope | Directory |
|-------|-----------|
| `WayFinder-Backend` | avatar-backend-wayfinder/ |
| `WayFinder-Frontend` | avatar-frontend/ |
| `Agent-Backend` | avatar-backend-agent/ |
| `Traditional-Backend` | avatar-backend/ |

## Workflow

### Step 0: Check for Unstaged Changes (CRITICAL)

**ALWAYS run `git status` FIRST to see ALL changes:**

```bash
git status --short
```

This shows:
- `M ` = Modified (staged)
- ` M` = Modified (unstaged)
- `A ` = Added (staged)
- ` D` = Deleted (unstaged)
- `D ` = Deleted (staged)
- `R ` = Renamed (staged)
- `??` = Untracked (new file)

**If there are unstaged changes (`M`, ` D`, `??`):**

1. Show the user ALL uncommitted changes in a clear summary
2. Ask: "Stage all changes for this commit, or select specific files?"
3. **Default**: Stage everything with `git add -A` unless user specifies otherwise
4. **NEVER assume** which files the user wants - show everything and confirm

```bash
# Stage all changes (default)
git add -A

# Or stage specific paths
git add <path1> <path2>
```

**Only proceed to Step 1 after ALL intended changes are staged.**

### Step 1: Analyze Staged Changes

Run these commands to understand what's being committed:

```bash
# Check which sub-repos are affected
git diff --cached --name-only | cut -d'/' -f1 | sort -u

# See summary of changes
git diff --cached --stat

# See detailed changes (for code files)
git diff --cached
```

**VERIFY**: Run `git status` again to confirm nothing is left unstaged that should be included.

### Step 2: Cross-Repo Warning

If changes span multiple sub-repos (e.g., both `avatar-backend-wayfinder/` and `avatar-frontend/`):

```
⚠️  WARNING: Changes span multiple sub-repos:
   - avatar-backend-wayfinder
   - avatar-frontend

Recommendation: Split into separate commits for cherry-pick compatibility.
Continue anyway? This will use combined scope: WayFinder-Backend|WayFinder-Frontend
```

Ask user to confirm or split the commit.

### Step 3: Determine Commit Type(s)

Analyze the changes:

| Change Pattern | Suggested Type |
|----------------|----------------|
| New files with features | `feat` |
| Modified files fixing issues | `fix` |
| Files in `tests/` directory | `test` |
| Files in `docs/` directory | `docs` |
| Deleted unused files | `chore` |
| Renamed/restructured files | `refactor` |
| Performance optimizations | `perf` |

If multiple types apply (e.g., cleanup + test rewrite), combine: `chore|test`

### Step 4: Generate Commit Message

Based on analysis, generate message:

```
<type>(Scope): <concise summary under 50 chars>

- Specific change 1
- Specific change 2
- Specific change 3

```

### Step 5: Final Verification

**Before committing, ALWAYS verify nothing is missed:**

```bash
git status
```

Check that:
- ✅ All intended changes show as "Changes to be committed"
- ✅ Nothing important remains in "Changes not staged" or "Untracked files"
- ✅ If anything is missed, go back to Step 0 and stage it

**Only proceed when working tree will be clean after commit (or user confirms remaining changes are intentional).**

### Step 6: Execute Commit

**IMPORTANT: Do NOT include any Co-Authored-By, Claude, or Anthropic references in commit messages.**

```bash
git commit -m "$(cat <<'EOF'
<type>(Scope): <summary>

- bullet 1
- bullet 2
EOF
)"
```

**After commit, run `git status` to confirm success.**

## Examples

### Single Type, Single Repo
```
test(WayFinder-Backend): improve evaluation test reliability

- Fix flaky theme tests by broadening expected keywords
- Rename TestStatus/TestCaseResult to avoid pytest warnings
- Update golden_dataset.json with realistic thresholds

```

### Combined Types, Single Repo
```
chore|test(WayFinder-Backend): clean up and rewrite test framework

- Remove constants.py and unused functions
- Consolidate test config into conftest.py files
- Fix flaky evaluation tests with realistic thresholds

```

### Cross-Repo (should be rare, warn first)
```
feat(WayFinder-Backend|WayFinder-Frontend): add voice-only mode

- Backend: Add voice-only API endpoint
- Frontend: Add toggle UI component

```

## Best Practices

1. **ALWAYS start with `git status`** - See ALL changes before doing anything
2. **NEVER assume which files to stage** - Show user everything, ask or stage all
3. **One logical change per commit** - Easier to review and cherry-pick
4. **Verify before committing** - Run `git status` to confirm nothing is missed
5. **Avoid cross-repo commits** - Split when possible
6. **Keep summary under 50 characters** - Fits in git log
7. **Use bullet points for details** - Clear and scannable
8. **Run tests before committing** - Ensure commit is self-contained
9. **No AI attribution** - Never include Co-Authored-By, Claude, Anthropic, or any AI tool references in commits

## Tips

- Use `git add -p` to stage partial changes for focused commits
- Use `git stash` to temporarily set aside unrelated changes
- Review with `git diff --cached` before committing
