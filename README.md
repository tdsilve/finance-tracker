# Finance Tracker

Bun workspace monorepo for a personal finance application.

## Structure

- `apps/client` - Next.js frontend
- `apps/server` - lightweight Hono API running on Bun
- `packages/shared` - shared TypeScript utilities and types

## Project Characteristics

### Client

- Built with Next.js App Router.
- Uses React Server Components by default.
- Intended for dashboards, transactions, budgets, reports, and user-facing finance workflows.
- Reads server data through HTTP APIs exposed by the Hono server.
- Runs locally on `http://localhost:3000`.

### Server

- Built with Hono and executed with Bun.
- Exposes a lightweight HTTP API for the client.
- Includes health checks, CORS, request logging, and centralized error handling.
- Uses shared TypeScript utilities from `packages/shared`.
- Runs locally on `http://localhost:3001`.

## Commands

```sh
bun install
bun run dev:server
bun run dev:client
bun run check
```

## Architecture Notes

Deployable applications live under `apps/*`, while reusable libraries live under `packages/*`. This is the common monorepo convention used by many Turborepo/Nx-style projects.

A CLI should only be added when the project needs one, for example data imports, migrations, scheduled jobs, or admin scripts. If added later, `apps/cli` would be the right place.
