type HealthResponse = {
  name: string;
  ok: true;
  timestamp: string;
};

async function getServerHealth(): Promise<HealthResponse | null> {
  const baseUrl = process.env.SERVER_URL ?? "http://localhost:3001";

  try {
    const response = await fetch(`${baseUrl}/health`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const health = await getServerHealth();

  return (
    <main className="page">
      <section className="shell">
        <div className="eyebrow">Bun workspace</div>
        <h1>Finance Tracker</h1>
        <p>
          A Next.js client, Hono server, and shared TypeScript package wired
          together as Bun workspaces.
        </p>
        <div className="status">
          <span className="dot" />
          <span>
            Server {health?.ok ? `online as ${health.name}` : "not reachable"}
          </span>
        </div>
      </section>
    </main>
  );
}
