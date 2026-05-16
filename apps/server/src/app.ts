import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { buildHealthResponse } from "@finance-tracker/shared";

export const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: Bun.env.CLIENT_ORIGIN ?? "http://localhost:3000"
  })
);

app.get("/", (c) => c.json({ message: "Finance Tracker API" }));
app.get("/health", (c) => c.json(buildHealthResponse("finance-tracker-server")));

app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.onError((error, c) => {
  console.error(error);
  return c.json({ message: "Internal Server Error" }, 500);
});
