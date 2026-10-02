import { useCallback, useEffect, useEffectEvent, useState } from 'react';

/**
 * Loads data from the services layer. Changing `key` refetches; `reload` refetches on demand
 * (e.g. on screen focus). Previous data stays visible while a refetch runs.
 */
export function useAsync<T>(load: () => Promise<T>, key = '') {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<{ data: T | null; loadedFor: string | null }>({ data: null, loadedFor: null });
  const run = useEffectEvent(load);
  const current = `${key}:${version}`;

  useEffect(() => {
    let alive = true;
    run().then((data) => {
      if (alive) setState({ data, loadedFor: current });
    });
    return () => {
      alive = false;
    };
  }, [current]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { data: state.data, loading: state.loadedFor !== current, reload };
}
