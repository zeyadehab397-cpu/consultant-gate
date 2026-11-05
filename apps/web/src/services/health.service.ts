import type { HealthResponse } from './health.types';
import { env } from '../config/env';

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${env.apiUrl}/api/health`);

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }

  return response.json();
}