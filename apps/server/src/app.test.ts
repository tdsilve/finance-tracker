import { describe, expect, test } from "bun:test";
import { app } from "./app";

describe("server app", () => {
  test("responds to health checks", async () => {
    const response = await app.request("/health");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.name).toBe("finance-tracker-server");
  });
});
