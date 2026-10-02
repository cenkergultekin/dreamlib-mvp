export type Visibility = 'private' | 'public';
export type InterpretationType = 'universal' | 'cultural' | 'psychoanalytic';
export type ArtStyle = 'manga' | 'illustration' | 'collage' | 'photographic';
export type PanelCount = 4 | 6 | 9;

/** Gradient colors stand in for generated art until the image API exists. */
export type Art = readonly [string, string, ...string[]];

export type DreamObject = { label: string; meaning: string; art: Art };
export type Emotion = { label: string; pct: number; note: string };

export type Analysis = {
  title: string;
  cleanText: string;
  tags: string[];
  interpretation: string;
  objects: DreamObject[];
  emotions: Emotion[];
};

export type MangaPanel = { art: Art; caption: string };

export type Dream = {
  id: string;
  createdAt: string; // ISO
  rawText: string;
  analysis: Analysis;
  panels: MangaPanel[];
  style: ArtStyle;
  visibility: Visibility;
  favorite: boolean;
  author?: string;
  likes?: number;
  category?: string;
};

export type Mood = { feeling?: string; sleep?: 'iyi' | 'orta' | 'kötü'; lucid?: boolean; nightmare?: boolean };

export type Match = {
  id: string;
  username: string;
  avatar: Art;
  similarity: number;
  sharedSymbols: string[];
  dreamTitle: string;
};

export type Message = { id: string; fromMe: boolean; text: string; time: string };

export type Profile = {
  username: string;
  displayName: string;
  streak: number;
  dreamCount: number;
  xp: number;
  weeklyGoal: { done: number; total: number };
  badges: string[];
  symbols: { label: string; count: number }[];
  plan: 'free' | 'basic' | 'premium';
};

export type BedtimeInsight = { feeling: string; possibleSymbols: string[]; note: string };
