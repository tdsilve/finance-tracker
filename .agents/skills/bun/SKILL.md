---
name: Bun
description: Use when building JavaScript/TypeScript applications, running scripts, managing dependencies, bundling code, testing, or creating HTTP servers. Bun is a complete JavaScript runtime, package manager, bundler, and test runner that replaces Node.js, npm, and other tools.
metadata:
    mintlify-proj: bun
    version: "1.0"
---

# Bun Skill Reference

## Product Summary

Bun is a unified JavaScript runtime, package manager, bundler, and test runner designed as a faster alternative to Node.js, npm, and other JavaScript tooling. It runs TypeScript and JSX natively without configuration, includes a built-in HTTP server (`Bun.serve`), and provides optimized APIs for file I/O, testing, and bundling.

**Key files and commands:**
- `bunfig.toml` — Configuration file for Bun-specific settings (optional, zero-config by default)
- `bun run <file>` — Execute TypeScript/JavaScript files
- `bun install` — Install dependencies (25x faster than npm)
- `bun build` — Bundle code for production
- `bun test` — Run Jest-compatible tests
- `bun init` — Initialize a new project
- `package.json` — Standard Node.js manifest (Bun reads this)

**Primary docs:** https://bun.com/docs

---

## When to Use

Reach for this skill when:

- **Running scripts or applications** — Use `bun run script.ts` instead of `node` or `npm run`
- **Installing dependencies** — Use `bun install` to replace `npm install` (much faster)
- **Building/bundling code** — Use `bun build` for production bundles, tree-shaking, minification
- **Writing tests** — Use `bun test` for Jest-compatible testing with TypeScript support
- **Creating HTTP servers** — Use `Bun.serve()` for high-performance REST APIs, WebSocket servers
- **Reading/writing files** — Use `Bun.file()` and `Bun.write()` for optimized file operations
- **Working with TypeScript/JSX** — Bun transpiles on-the-fly; no separate build step needed
- **Managing environment variables** — Bun auto-loads `.env` files
- **Creating full-stack apps** — Use HTML imports with `Bun.serve` to bundle frontend + backend together

---

## Quick Reference

### Essential CLI Commands

| Command | Purpose |
|---------|---------|
| `bun run <file>` | Execute a TypeScript/JavaScript file |
| `bun run <script>` | Run a script from `package.json` |
| `bun install` | Install all dependencies (reads `package.json`) |
| `bun add <pkg>` | Add a dependency |
| `bun remove <pkg>` | Remove a dependency |
| `bun build <entry> --outdir ./out` | Bundle code for production |
| `bun test` | Run all tests matching `*.test.ts` or `*.spec.ts` |
| `bun init` | Create a new Bun project |
| `bun --hot <file>` | Run with hot reload (file changes trigger restart) |

### File Conventions

| Pattern | Meaning |
|---------|---------|
| `*.ts`, `*.tsx` | TypeScript files (transpiled automatically) |
| `*.js`, `*.jsx` | JavaScript files (JSX transpiled automatically) |
| `*.test.ts`, `*_test.ts` | Test files (discovered by `bun test`) |
| `*.spec.ts`, `*_spec.ts` | Test files (discovered by `bun test`) |
| `bunfig.toml` | Bun configuration (optional) |
| `.env`, `.env.local` | Environment variables (auto-loaded) |
| `bun.lock` | Lockfile (text format, commit to version control) |

### Core APIs

| API | Purpose |
|-----|---------|
| `Bun.serve({ fetch, routes })` | Start HTTP server |
| `Bun.file(path)` | Read file (returns BunFile) |
| `Bun.write(path, data)` | Write file |
| `Bun.env` | Access environment variables |
| `Bun.build({ entrypoints, outdir })` | Bundle code |
| `Bun.Transpiler` | Transpile code at runtime |

---

## Decision Guidance

### When to Use `bun run` vs `bun build`

| Use `bun run` | Use `bun build` |
|---------------|-----------------|
| Development, scripts, one-off tasks | Production deployments |
| Direct execution of `.ts` files | Bundling for browsers or servers |
| Testing, debugging | Minification, tree-shaking needed |
| Hot reload with `--hot` | Single executable with `--compile` |

### When to Use `Bun.serve` vs Framework (Express, Elysia)

| Use `Bun.serve` | Use Framework |
|-----------------|---------------|
| Simple REST APIs, static routes | Complex routing, middleware chains |
| High performance, minimal overhead | Type safety, validation, plugins |
| Full-stack with HTML imports | Existing Express/Node.js codebase |
| WebSocket servers | Advanced features (auth, ORM integration) |

### Installation Strategy: Hoisted vs Isolated

| Hoisted | Isolated |
|---------|----------|
| Traditional npm behavior | pnpm-like strict isolation |
| Shared `node_modules` directory | Packages in `node_modules/.bun/` |
| Default for existing projects | Default for new workspaces |
| Faster installs, phantom dependencies possible | Slower installs, prevents phantom deps |

---

## Workflow

### 1. Initialize a Project
```bash
bun init my-app
cd my-app
```
Choose template: Blank, React, or Library. Bun creates `package.json`, `tsconfig.json`, and `index.ts`.

### 2. Install Dependencies
```bash
bun install
# or add specific packages
bun add react
bun add -d typescript
```
Bun reads `package.json`, downloads packages, and creates `bun.lock`.

### 3. Write Code (TypeScript/JSX)
Create `.ts` or `.tsx` files. Bun transpiles automatically—no build step needed for development.

```typescript
// index.ts
const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Hello!"),
  },
});
console.log(`Server at ${server.url}`);
```

### 4. Run During Development
```bash
bun run index.ts
# or with hot reload
bun --hot index.ts
```

### 5. Write Tests
Create `*.test.ts` files with Jest-like API:
```typescript
import { test, expect } from "bun:test";
test("math", () => {
  expect(2 + 2).toBe(4);
});
```

Run tests:
```bash
bun test
bun test --watch
```

### 6. Build for Production
```bash
bun build ./index.ts --outdir ./dist
# or create a standalone executable
bun build ./cli.ts --outfile mycli --compile
```

### 7. Deploy
Commit `bun.lock` to version control. In CI/CD, use `bun ci` (equivalent to `bun install --frozen-lockfile`).

---

## Common Gotchas

- **TypeScript errors on `Bun` global** — Install `@types/bun` and add `"lib": ["ESNext"]` to `tsconfig.json`
- **Auto-install disabled in production** — Set `install.auto = "disable"` in `bunfig.toml` for security
- **Lifecycle scripts don't run by default** — Add packages to `trustedDependencies` in `package.json` to allow postinstall scripts
- **Environment variables not loading** — Ensure `.env` file is in the project root; Bun auto-loads `.env`, `.env.local`, and `.env.[NODE_ENV]`
- **Phantom dependencies in hoisted mode** — Use `isolated` linker for strict dependency isolation (default for new workspaces)
- **Bundler doesn't type-check** — Use `tsc` separately for type checking; `bun build` only transpiles
- **Routes require Bun v1.2.3+** — If using `routes` in `Bun.serve`, ensure Bun is up to date
- **Idle timeout on streaming responses** — Use `server.timeout(req, 0)` to disable timeout for Server-Sent Events or long-lived streams
- **External imports in bundles** — Mark packages as external with `--external` to exclude them from bundles
- **Missing `outdir` in `Bun.build`** — Without `outdir`, bundles are returned in memory but not written to disk

---

## Verification Checklist

Before submitting work with Bun:

- [ ] **Dependencies installed** — Run `bun install` and verify `bun.lock` is created
- [ ] **Code runs locally** — Execute `bun run <file>` or `bun --hot <file>` and verify no errors
- [ ] **Tests pass** — Run `bun test` and confirm all tests pass (or `bun test --watch` during development)
- [ ] **TypeScript compiles** — No type errors in editor; optionally run `tsc --noEmit` for full check
- [ ] **Environment variables set** — Verify `.env` file exists with required variables, or set via CLI
- [ ] **Build succeeds** — Run `bun build` and check output in `dist/` or specified `--outdir`
- [ ] **No console errors** — Check browser console and server logs for warnings/errors
- [ ] **Lockfile committed** — Ensure `bun.lock` is in version control (not `.gitignore`)
- [ ] **Configuration valid** — If using `bunfig.toml`, verify syntax and settings match docs
- [ ] **Performance acceptable** — For HTTP servers, test with `bun --hot` and verify response times

---

## Resources

**Comprehensive navigation:** https://bun.com/docs/llms.txt

**Critical documentation pages:**
1. [Quickstart](https://bun.com/docs/quickstart) — Build your first app in 5 minutes
2. [Runtime > HTTP Server](https://bun.com/docs/runtime/http/server) — `Bun.serve()` API and routing
3. [Package Manager > Install](https://bun.com/docs/pm/cli/install) — `bun install` and dependency management
4. [Bundler](https://bun.com/docs/bundler) — `bun build` API and options
5. [Test Runner](https://bun.com/docs/test) — `bun test` and Jest-compatible testing

---

> For additional documentation and navigation, see: https://bun.com/docs/llms.txt