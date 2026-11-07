<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Decision Boundaries
- The developer owns architecture, business logic, data models, and major technical decisions.
- The agent may autonomously implement UI layout, styling, responsive behavior, and repetitive code when requested.
- For business logic tasks, prefer explanations, implementation plans, and test cases unless implementation is explicitly requested.
- Ask before introducing dependencies, changing architecture, or modifying API contracts.

## Working Process
- Inspect relevant code before making changes.
- For non-trivial tasks, briefly describe the approach and affected files before implementation.
- Make the smallest coherent change that solves the task.
- Reuse existing utilities, components, and conventions.
- Do not modify unrelated code or overwrite existing user changes.

## UI Development
- Use Stitch designs and exports as visual references.
- Follow DESIGN.md and existing design tokens.
- Prefer reusable components over duplicated markup.
- Support responsive layouts and relevant UI states.
- Do not invent business logic when implementing UI.

## Verification
- Run relevant existing checks after changes.
- For UI tasks, verify rendering and responsive behavior using available browser tools.
- Do not claim a test passed unless it actually ran.
- Report verification failures and unresolved issues.

## Communication
- Keep responses concise and technical.
- Explain significant trade-offs instead of silently choosing.
- After implementation, report changed files, verification results, and remaining work.
