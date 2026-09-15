import { API_BASE_URL } from '@/lib/config';

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { apiKey?: string; token?: string } = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (init.apiKey) headers.set('X-API-Key', init.apiKey);
  if (init.token) headers.set('Authorization', `Bearer ${init.token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export type ListEnvelope<T> = {
  data: { items: T[]; nextCursor?: string };
  meta?: { requestId?: string; pagination?: unknown };
};
