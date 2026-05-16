export type HealthResponse = {
  name: string;
  ok: true;
  timestamp: string;
};

export function buildHealthResponse(name: string): HealthResponse {
  return {
    name,
    ok: true,
    timestamp: new Date().toISOString()
  };
}
