# AGENTS.md

Guidance for AI agents working in this repository.

## Instruction Precedence

- Follow this file for repository-wide guidance.
- Follow local `AGENTS.md` files for their subtree.
- Current user instructions override repository guidance when they conflict.

## Project

Finance Tracker is a Bun workspace monorepo for a personal finance app.

Use Bun as package manager and runtime. Do not use npm, yarn, or pnpm unless explicitly requested.

- `apps/client`: Next.js App Router frontend.
- `apps/server`: lightweight Hono API running on Bun.
- `packages/shared`: minimal shared TypeScript package.

Deployable applications belong under `apps/*`. Reusable libraries belong under `packages/*`.

## Commands

- Install dependencies: `bun install`
- Run the client: `bun run dev:client`
- Run the server: `bun run dev:server`
- Run typecheck and tests: `bun run check`
- Run workspace tests: `bun test --workspaces`
- Build the client: `bun --filter @finance-tracker/client build`
- Run workspace-specific commands with `bun --filter <workspace-name> <script>`.

## Architecture

- SoC — Separation of Concerns: split code that mixes unrelated responsibilities.
- DRY — Don't Repeat Yourself: extract duplicated logic only when reuse is real and the abstraction stays simple.
- KISS — Keep It Simple: prefer direct, idiomatic solutions and avoid overengineering.
- Feature-Based Folder Architecture: organize growing product code by domain or feature, not only by technical type.

## Rules

- Inspect existing files before editing.
- Prefer existing patterns and small, focused modules.
- Keep `packages/shared` minimal; use it only for reused code, cross-workspace contracts, or clearly cross-cutting utilities.
- Keep app-specific domain logic inside the app that owns it.
- Do not add a CLI workspace unless there is a concrete CLI use case.
- Keep `bun.lock` updated when dependencies change.
- Do not revert user changes unless explicitly asked.
- Do not change unrelated files unless necessary to complete the task safely.
- For manual edits, use patches rather than rewriting whole files unnecessarily.

## Code Style

- Use TypeScript for application and package code.
- Use ASCII text unless a file already requires another character set.
- Keep names clear and domain-oriented.
- Add comments only when they explain non-obvious behavior.

## Validation

- General changes: `bun run check`
- Client changes: also run `bun --filter @finance-tracker/client build` when practical.
- Dependency changes: run `bun install` and keep `bun.lock` updated.
