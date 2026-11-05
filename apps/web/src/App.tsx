import { useEffect, useState } from 'react';
import { getHealth } from './services/health.service';
import type { HealthResponse } from './services/health.types';

type HealthState =
  | { status: 'loading' }
  | { status: 'success'; data: HealthResponse }
  | { status: 'error'; message: string };

function App() {
  const [health, setHealth] = useState<HealthState>({
    status: 'loading',
  });

  useEffect(() => {
    async function checkHealth() {
      try {
        const data = await getHealth();

        setHealth({
          status: 'success',
          data,
        });
      } catch (error) {
        setHealth({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Something went wrong',
        });
      }
    }

    void checkHealth();
  }, []);

  return (
    <main>
      <h1>Consultant Gate</h1>

      {health.status === 'loading' && (
        <p>Checking API connection...</p>
      )}

      {health.status === 'success' && (
        <section>
          <h2>API Connected</h2>
          <p>Status: {health.data.status}</p>
          <p>Service: {health.data.service}</p>
          <p>Timestamp: {health.data.timestamp}</p>
        </section>
      )}

      {health.status === 'error' && (
        <section>
          <h2>API Connection Failed</h2>
          <p>{health.message}</p>
        </section>
      )}
    </main>
  );
}

export default App;