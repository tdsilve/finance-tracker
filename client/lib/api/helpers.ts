import { TypedBody, JsonStringifiable } from "./types";

export function toJson<T extends JsonStringifiable>(data: T) {
  return {
    type: "json" as const,
    data: JSON.stringify(data),
  } satisfies TypedBody;
}

type Primitive = string | boolean | number;
export function createSearchParams(obj?: Record<string, Primitive>) {
  const searchParams = new URLSearchParams();
  if (obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (value != null) {
        searchParams.set(key, String(value));
      }
    }
  }
  return searchParams;
}
