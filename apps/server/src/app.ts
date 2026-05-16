import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { HealthResponse } from "@finance-tracker/shared";

export const app = new Hono();

function build_health_response(name: string): HealthResponse {
  return {
    name,
    ok: true,
    timestamp: new Date().toISOString()
  };
}

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: Bun.env.CLIENT_ORIGIN ?? "http://localhost:3000"
  })
);

app.get("/", (c) => c.json({ message: "Finance Tracker API" }));
app.get("/health", (c) => c.json(build_health_response("finance-tracker-server")));

app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.onError((error, c) => {
  console.error(error);
  return c.json({ message: "Internal Server Error" }, 500);
});
