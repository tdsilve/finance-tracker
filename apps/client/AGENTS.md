# Client AGENTS.md

Guidance for AI agents working in the Next.js client.

## Project Scope

This workspace contains the user-facing Finance Tracker frontend.

- Framework: Next.js App Router.
- Styling: Tailwind CSS v4.
- UI primitives: shadcn components in `components/ui`.
- Shared utilities: `lib/utils.ts`.

## Commands

Run commands from the repository root unless there is a specific reason to work inside `apps/client`.

- Start the client: `bun run dev:client`
- Build the client: `bun --filter @finance-tracker/client build`
- Typecheck the client: `bun --filter @finance-tracker/client typecheck`
- Run full repo checks: `bun run check`

## Client Conventions

- Prefer Server Components by default.
- Use Client Components only for state, effects, event handlers, browser APIs, or interactive UI.
- Keep route UI under `app/`.
- Keep reusable client components under `components/`.
- Keep shadcn UI components under `components/ui/`.
- Keep frontend helper functions under `lib/`.
- Use the `@/*` import alias for client-local imports.
- Do not put server-only secrets or privileged logic in the client.
- Keep page layouts practical for finance workflows: readable, dense enough for dashboards, and easy to scan.

## Feature-Based Frontend Architecture

Use feature folders when a feature grows beyond a single page or component:

```text
features/<feature-name>/
  components/
  hooks/
  services/
  schemas/
  utils/
```

- Keep feature-specific components, hooks, requests, schemas, and utilities inside the feature folder.
- Move code to shared client folders only when it is generic across multiple features.
- Move code to `packages/shared` only when it is useful outside the client workspace.
