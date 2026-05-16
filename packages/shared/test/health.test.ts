import { describe, expect, test } from "bun:test";
import { buildHealthResponse } from "../src";

describe("buildHealthResponse", () => {
  test("returns a healthy status payload", () => {
    const response = buildHealthResponse("server");

    expect(response.name).toBe("server");
    expect(response.ok).toBe(true);
    expect(Date.parse(response.timestamp)).not.toBeNaN();
  });
});
