import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { colors, type Colors, type Scheme } from './tokens';

type ThemeValue = { scheme: Scheme; c: Colors; toggle: () => void };

const ThemeContext = createContext<ThemeValue | null>(null);

// Light first like the references; the night variant is one tap away in Profile.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<Scheme>('light');
  const value = useMemo(
    () => ({ scheme, c: colors[scheme], toggle: () => setScheme((s) => (s === 'dark' ? 'light' : 'dark')) }),
    [scheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
