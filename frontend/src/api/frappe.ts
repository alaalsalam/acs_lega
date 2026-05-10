import { fallbackData } from '../data/fallback';
import type { SiteData } from '../types';

const API_BASE = '/api/method/acs_legal.api.website';

async function call<T>(method: string, params?: Record<string, unknown>): Promise<T> {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
  });

  const suffix = query.toString() ? `?${query.toString()}` : '';
  const response = await fetch(`${API_BASE}.${method}${suffix}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const json = await response.json();
  if (json.exception) throw new Error(json._error_message || json.exc_type || 'API exception');
  return json.message as T;
}

export async function getSiteData(): Promise<SiteData> {
  try {
    return await call<SiteData>('get_site_data');
  } catch {
    return fallbackData;
  }
}

export async function submitContact(payload: Record<string, string>) {
  return call<{ success: boolean; error?: string }>('submit_contact', {
    data: JSON.stringify(payload),
  });
}
