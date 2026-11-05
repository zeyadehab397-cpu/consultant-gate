import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getHealth } from './services/health.service';
import type { HealthResponse } from './services/health.types';
import App from './App';

vi.mock('./services/health.service', () => ({
  getHealth: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should display loading state', () => {
    vi.mocked(getHealth).mockReturnValue(
      new Promise<HealthResponse>(() => {}),
    );

    render(<App />);

    expect(
      screen.getByText('Checking API connection...'),
    ).toBeInTheDocument();
  });

  
  it('should display success state when API responds successfully', async () => {
    vi.mocked(getHealth).mockResolvedValue({
      status: 'ok',
      service: 'consultant-gate-api',
      timestamp: '2026-11-05T12:00:00.000Z',
    });

    render(<App />);

    expect(
      await screen.findByText('API Connected'),
    ).toBeInTheDocument();

    expect(screen.getByText('Status: ok')).toBeInTheDocument();

    expect(
      screen.getByText('Service: consultant-gate-api'),
    ).toBeInTheDocument();
  });

  
  
  it('should display error state when API request fails', async () => {
    vi.mocked(getHealth).mockRejectedValue(
      new Error('Network Error'),
    );

    render(<App />);

    expect(
      await screen.findByText('API Connection Failed'),
    ).toBeInTheDocument();

    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });
});