// src/hooks/useMouserSearch.js
// Encapsulates Mouser API search state: results, loading, error
// Demonstrates: custom hook, useEffect, useState

import { useState, useEffect } from 'react';
import { searchComponents } from '../services/mouserAPI';

/**
 * Custom hook for Mouser component search.
 * Automatically re-searches when `keyword` changes.
 * @param {string} keyword - debounced search term
 * @returns {{ results, loading, error }}
 */
export function useMouserSearch(keyword) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keyword || keyword.trim().length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchComponents(keyword.trim());
        if (!cancelled) {
          setResults(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch from Mouser API');
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    // Cleanup: ignore stale results if keyword changed
    return () => { cancelled = true; };
  }, [keyword]);

  return { results, loading, error };
}
