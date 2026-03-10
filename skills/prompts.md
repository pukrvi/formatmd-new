ANTHROPIC  Guidelines =

**Bottom line:**
Anthropic recommends using **`CLAUDE.md` as persistent project context** for Claude Code. The file acts as a lightweight “agent manifest” that tells Claude how your codebase works, which commands to run, and what standards to follow. The best results come from **keeping it concise, structured, and continuously updated.** ([Anthropic](https://www.anthropic.com/engineering/claude-code-best-practices?source=post_page-----b121b0d19903---------------------------------------&utm_source=chatgpt.com))

Below are the **core best practices Anthropic and the Claude Code docs highlight.**

---

# 1. Use `CLAUDE.md` as persistent project context

`CLAUDE.md` is a markdown file placed in the repo (usually root) that Claude automatically loads into context at the start of every session. ([Anthropic](https://www.anthropic.com/engineering/claude-code-best-practices?source=post_page-----b121b0d19903---------------------------------------&utm_source=chatgpt.com))

**Purpose**

- Share project rules with the AI
- Avoid repeating instructions
- Standardize how Claude interacts with your repo

**Typical locations**

- Project root: `repo/CLAUDE.md`
- Subdirectory specific files
- User home folder `~/.claude/CLAUDE.md` for global rules

Claude automatically merges these into the working context. ([Gist](https://gist.github.com/jussker/e825980ed46af2b99318e19ef01083be?utm_source=chatgpt.com))

---

# 2. Keep it concise (context window matters)

Claude’s performance degrades when the context window becomes large. ([Claude](https://code.claude.com/docs/en/best-practices?utm_source=chatgpt.com))

**Implication for `CLAUDE.md`:**

- Avoid long explanations
- Use bullet points
- Remove redundant instructions

**Good**

```
Run tests:
npm run test:unit
```

**Bad**

```
When making code changes you should ideally run the test suite
to ensure that your code still works properly.
```

Short instructions preserve tokens for actual tasks.

---

# 3. Document commands Claude should run

One of the most important sections.

Example:

```
## Common Commands

Install dependencies
npm install

Run dev server
npm run dev

Run unit tests
npm run test

Lint code
npm run lint
```

Why this matters:

Without it Claude may **guess incorrect commands**, which leads to errors or wasted steps. ([Dometrain](https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/?utm_source=chatgpt.com))

---

# 4. Include architecture and tech stack

Claude works much better when it understands how the system is structured.

Typical section:

```
## Tech Stack
Frontend: React + TypeScript
Backend: Node.js + Express
Database: PostgreSQL

## Architecture
- api/
- services/
- db/
- frontend/
```

This prevents Claude from introducing patterns that conflict with the existing architecture.

---

# 5. Add coding standards and conventions

This ensures generated code matches the repo style.

Example:

```
## Code Style

- Use TypeScript strict mode
- Prefer functional components
- Use Tailwind for styling
- Use Zod for validation
```

Without this, Claude often introduces inconsistent patterns.

---

# 6. Treat it as a living document

Anthropic emphasizes iterating on the file.

Update it whenever you see repeated mistakes.

Example updates:

- “Run single tests instead of full suite”
- “Do not modify generated files”
- “Use service layer instead of direct DB calls”

This gradually **teaches the agent your workflow**. ([Dometrain](https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/?utm_source=chatgpt.com))

---

# 7. Version control the file

Add `CLAUDE.md` to the repository.

Benefits:

- Shared behavior across the team
- Review changes like code
- Claude agents running elsewhere understand the repo immediately

Also avoid putting secrets inside it. ([Dometrain](https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/?utm_source=chatgpt.com))

---

# 8. Break large rules into separate docs

If your standards are long:

Instead of:

```
CLAUDE.md
  - 500 lines of rules
```

Use:

```
CLAUDE.md
docs/coding-standards.md
docs/testing.md
docs/architecture.md
```

Then reference them.

This keeps the context efficient.

---

# 9. Plan before implementation

Anthropic teams consistently emphasize **planning tasks first** before letting Claude implement them. ([rosmur.github.io](https://rosmur.github.io/claudecode-best-practices/?utm_source=chatgpt.com))

Typical workflow:

1. Ask Claude to propose a plan
2. Review the plan
3. Execute step by step

This prevents chaotic code generation.

---

# 10. Break complex tasks into smaller ones

Claude performs better when tasks are modular.

Instead of:

```
Build the entire feature.
```

Use:

```
1. Add API endpoint
2. Write validation
3. Add database migration
4. Add tests
```

This improves reliability and debugging.

---

# Example `CLAUDE.md` template (recommended)

```
# CLAUDE.md

## Project Overview
Short description of the product.

## Tech Stack
Backend: Node.js + Express
Frontend: React + TypeScript
Database: PostgreSQL

## Architecture
api/
services/
db/
frontend/

## Common Commands
Install deps
npm install

Run dev server
npm run dev

Run tests
npm run test

## Code Style
- Use TypeScript strict
- Use functional components
- Prefer service layer for DB access

## Development Rules
- Run unit tests before committing
- Do not modify generated files
- Use existing utilities before adding new ones
```

---

# The three biggest mistakes teams make

1. **Overloading CLAUDE.md with long explanations**
2. **Not updating it when Claude makes mistakes**
3. **Missing command documentation**

These cause most agent failures.

---

# create a claude.md and memory.md file in the root of 'new' folder.
It is a file where you maintain the instruction for yourelf to work on this project.

1. Make sure that you create file called memory.MD wish you update with everyone.
- In starting make sure memory.MD has all the update so far which we have in the product and then it is for you to edit each time acting as a memory log.

2. claude.md will have instruction for you to operate.
- Have a basic understanding of what the product is.
- Brand guidelines for FormatMD.
- make sure all the code follow best practises and design consistency of the project.
- Best practices from anthropic for Claude.MD
- make sure all the changes are to be made in ONLY the folder /Users/gtmbuddy/Documents/formatmd/formatmd-new/
- make sure all the code that is written, has consistent and accurate inline comments.
- make sure to do a quality review and a browser. Check every time when you write code to make sure that it is functioning properly.
- instruct to update the memory file every time any process is complete or run complete.
- create a pull request with Notes.
- create a separate formal product documentation wiki and make sure that it is updated with each pull request.
- make sure to update all the README and the developer files up-to-date with each full request.