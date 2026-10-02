import { createContext, useContext, useState, type ReactNode } from 'react';

import type { Analysis, ArtStyle, InterpretationType, MangaPanel, Mood, PanelCount, Visibility } from '@/services/types';

// The dream being told right now, carried across tell → review → analysis → style → manga.
export type Draft = {
  rawText: string;
  mood: Mood;
  cleanText: string;
  tags: string[];
  analysisIndex: number;
  interpretationType: InterpretationType;
  analysis: Analysis | null;
  style: ArtStyle;
  panelCount: PanelCount;
  withAvatar: boolean;
  panels: MangaPanel[];
  visibility: Visibility;
};

const empty: Draft = {
  rawText: '',
  mood: {},
  cleanText: '',
  tags: [],
  analysisIndex: 0,
  interpretationType: 'universal',
  analysis: null,
  style: 'manga',
  panelCount: 6,
  withAvatar: true,
  panels: [],
  visibility: 'private',
};

type DraftValue = { draft: Draft; update: (patch: Partial<Draft>) => void; reset: () => void };

const DraftContext = createContext<DraftValue | null>(null);

export function DraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(empty);
  const value = { draft, update: (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch })), reset: () => setDraft(empty) };
  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useDraft() {
  const value = useContext(DraftContext);
  if (!value) throw new Error('useDraft must be used inside DraftProvider');
  return value;
}
