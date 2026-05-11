import { useEffect, useState, useCallback } from 'react';
import type { SiteData } from '../types';
import { getSiteData } from '../api/frappe';
import { fallbackData } from '../data/fallback';

/**
 * Hook: loads site data from Frappe API.
 * Falls back to static data if API fails.
 * Calls API only once on mount (no refresh).
 */
export function useSiteData() {
  const [data, setData] = useState<SiteData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getSiteData()
      .then((fetched) => {
        if (!cancelled) {
          setData(fetched);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load site data');
          setLoading(false);
          // fallback already set in useState
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { data, setData, loading, error };
}