import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

// Phase 1 session: lives in memory, so every reload starts at onboarding. Phase 2 swaps this for Supabase Auth.
type Session = { onboarded: boolean; guest: boolean; finish: (guest: boolean) => void; signOut: () => void };

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ onboarded: false, guest: false });
  const value = useMemo(
    () => ({
      ...state,
      finish: (guest: boolean) => setState({ onboarded: true, guest }),
      signOut: () => setState({ onboarded: false, guest: false }),
    }),
    [state],
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error('useSession must be used inside SessionProvider');
  return value;
}
