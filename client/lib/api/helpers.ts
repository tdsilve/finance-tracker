import { TypedBody, JsonStringifiable } from "./types";

export function toJson<T extends JsonStringifiable>(data: T) {
  return {
    type: "json" as const,
    data: JSON.stringify(data),
  } satisfies TypedBody;
}
