// The only door between screens and data. Phase 1 returns mocks; Phase 2 swaps the bodies for Supabase.
import { exploreDreams, makePanels, matches, messages, myDreams, profile, sampleAnalyses } from './mock-data';
import type { Analysis, ArtStyle, BedtimeInsight, Dream, InterpretationType, Message, Mood, PanelCount } from './types';

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));
let store = [...myDreams];
let analysisCursor = 0;

export async function listMyDreams() {
  await wait(150);
  return [...store].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDream(id: string) {
  await wait(100);
  return store.find((d) => d.id === id) ?? exploreDreams.find((d) => d.id === id) ?? null;
}

/** Spell fix, theme and tags. The user approves this before interpretation. */
export async function cleanDream(rawText: string, _mood?: Mood) {
  await wait(900);
  const a = sampleAnalyses[analysisCursor++ % sampleAnalyses.length];
  return { cleanText: rawText.trim().length > 40 ? rawText.trim() : a.cleanText, tags: a.tags, analysisIndex: (analysisCursor - 1) % sampleAnalyses.length };
}

export async function interpretDream(cleanText: string, type: InterpretationType, analysisIndex: number): Promise<Analysis> {
  await wait(1200);
  const a = sampleAnalyses[analysisIndex % sampleAnalyses.length];
  const prefix = type === 'cultural' ? 'Geleneksel tabire göre: ' : type === 'psychoanalytic' ? 'Psikanalitik açıdan: ' : '';
  return { ...a, cleanText, interpretation: prefix + a.interpretation };
}

export async function generateManga(analysisIndex: number, _style: ArtStyle, count: PanelCount, _withAvatar: boolean) {
  await wait(1600);
  return makePanels(analysisIndex, count);
}

export async function saveDream(input: Omit<Dream, 'id' | 'createdAt' | 'favorite'>) {
  await wait(300);
  const dream: Dream = { ...input, id: `d${Date.now()}`, createdAt: new Date().toISOString(), favorite: false };
  store = [dream, ...store];
  return dream;
}

export async function updateDream(id: string, patch: Partial<Pick<Dream, 'favorite' | 'visibility'>>) {
  store = store.map((d) => (d.id === id ? { ...d, ...patch } : d));
}

export async function listExplore(category?: string) {
  await wait(200);
  return category ? exploreDreams.filter((d) => d.category === category) : exploreDreams;
}

export async function listMatches() {
  await wait(200);
  return matches;
}

export async function getMatch(id: string) {
  return matches.find((m) => m.id === id) ?? null;
}

export async function listMessages(matchId: string) {
  await wait(100);
  return messages[matchId] ?? [];
}

export async function sendMessage(matchId: string, text: string): Promise<Message> {
  const msg: Message = { id: String(Date.now()), fromMe: true, text, time: new Date().toTimeString().slice(0, 5) };
  messages[matchId] = [...(messages[matchId] ?? []), msg];
  return msg;
}

export async function getProfile() {
  await wait(100);
  return { ...profile, dreamCount: profile.dreamCount + store.length - myDreams.length };
}

export async function getBedtimeInsight(feeling: string): Promise<BedtimeInsight> {
  await wait(1000);
  return {
    feeling,
    possibleSymbols: ['su', 'kapı', 'yolculuk'],
    note: 'Bugünkü duygun yarım kalmış bir şeye işaret ediyor. Böyle gecelerde rüyada sık sık kapılar ve yolculuklar görülür.',
  };
}
