import type { Analysis, Art, Dream, Match, Message, Profile } from './types';

// Flat [block, disc, accent] triples from the theme palette; stand-ins for generated art.
export const art = {
  glass: ['#B8A4FF', '#D7FF3D', '#FFFDF7'],
  birds: ['#FFD84D', '#FF8A4C', '#FFFDF7'],
  door: ['#7B5CFF', '#FF9BD2', '#D7FF3D'],
  train: ['#121016', '#FFD84D', '#7B5CFF'],
  market: ['#D7FF3D', '#7B5CFF', '#FF9BD2'],
  stairs: ['#8FD3FF', '#FFFDF7', '#7B5CFF'],
  clocks: ['#FF9BD2', '#FFD84D', '#B8A4FF'],
  library: ['#FF8A4C', '#B8A4FF', '#FFD84D'],
  desert: ['#FFD84D', '#FFFDF7', '#FF8A4C'],
  rain: ['#7B5CFF', '#8FD3FF', '#B8A4FF'],
  shell: ['#FFFDF7', '#FF9BD2', '#8FD3FF'],
  windows: ['#8FD3FF', '#D7FF3D', '#FF9BD2'],
  snow: ['#B8A4FF', '#FFFDF7', '#8FD3FF'],
} satisfies Record<string, Art>;

const panelArts: Art[] = [art.glass, art.birds, art.stairs, art.market, art.library, art.train, art.clocks, art.windows, art.snow];

export const sampleAnalyses: Analysis[] = [
  {
    title: 'Cam şehir',
    cleanText: 'Cam bir şehrin üzerinde alçaktan uçuyordum. Her pencerede farklı bir anı vardı; bazıları benim değildi. En yüksek kuleye yaklaşınca camlar bir çan gibi çınlamaya başladı.',
    tags: ['uçmak', 'cam', 'anı', 'şehir'],
    interpretation: 'Cam ve ışık, çoktan sahip olduğun ama henüz kendine itiraf etmediğin bir berraklığı anlatır. Yüksekten bakmak, hayatına biraz mesafeyle bakmaya hazır olduğunu gösteriyor.',
    objects: [
      { label: 'Cam', meaning: 'Kabul etmediğin ama zaten sahip olduğun berraklık.', art: art.glass },
      { label: 'Uçmak', meaning: 'Kontrolü bırakınca gelen özgürlük hissi.', art: art.windows },
      { label: 'Pencere', meaning: 'Başkalarının hayatına duyulan merak.', art: art.library },
    ],
    emotions: [
      { label: 'Hayranlık', pct: 54, note: 'Yükseklik ve ışık sahneye hâkim.' },
      { label: 'Merak', pct: 31, note: 'Tanımadığın anılara bakıyorsun.' },
      { label: 'Tedirginlik', pct: 15, note: 'Çan sesi bir uyarı gibi.' },
    ],
  },
  {
    title: 'Kuşa dönüşen anahtar',
    cleanText: 'Biri elime bir anahtar verdi. Dokunduğum anda anahtar bir kuşa dönüştü ve avucumdan uçtu.',
    tags: ['anahtar', 'kuş', 'değişim'],
    interpretation: 'Dokununca biçim değiştiren nesneler, uyanık hayatında geçiş hâlindeki bir şeyin habercisidir. Elindeki fırsatı sıkı tutmak yerine nereye uçtuğunu izlemek iyi gelebilir.',
    objects: [
      { label: 'Anahtar', meaning: 'Elindeki yeni bir imkân ya da açılmayı bekleyen bir kapı.', art: art.clocks },
      { label: 'Kuş', meaning: 'Tutmaya çalıştıkça uzaklaşan bir fırsat.', art: art.birds },
      { label: 'El', meaning: 'Sorumluluğu devralma anı.', art: art.desert },
    ],
    emotions: [
      { label: 'Merak', pct: 48, note: 'Dönüşüm anı seni durdurmuyor.' },
      { label: 'Şaşkınlık', pct: 34, note: 'Beklenmedik bir biçim değişimi.' },
      { label: 'Kayıp', pct: 18, note: 'Elinden uçup gidiyor.' },
    ],
  },
];

const captions = [
  ['Şehir camdan yapılmıştı.', 'Her pencerede başka bir anı.', 'Bazıları benim değildi.', 'En yüksek kule yaklaştı.', 'Camlar bir çan gibi çınladı.', 'Bütün şehir aynı akoru söyledi.'],
  ['Biri elime bir anahtar bıraktı.', 'Metal parmaklarımda ısındı.', 'Sonra tüylendi.', 'Anahtar bir kuşa dönüştü.', 'Avucumdan havalandı.', 'Kapıyı hiç öğrenemedim.'],
];

export function makePanels(analysisIndex: number, count: number) {
  const lines = captions[analysisIndex % captions.length];
  return Array.from({ length: count }, (_, i) => ({ art: panelArts[i % panelArts.length], caption: lines[i % lines.length] }));
}

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const myDreams: Dream[] = [
  { id: 'd1', createdAt: daysAgo(0), rawText: 'cam bi şehrin üstünde uçuyodum her pencerede anılar vardı', analysis: sampleAnalyses[0], panels: makePanels(0, 6), style: 'manga', visibility: 'private', favorite: true },
  { id: 'd2', createdAt: daysAgo(2), rawText: 'biri bana anahtar verdi kuş oldu uçtu', analysis: sampleAnalyses[1], panels: makePanels(1, 4), style: 'illustration', visibility: 'public', favorite: false },
];

const publicDream = (id: string, title: string, tag: string, a: Art, likes: number, category: string, author: string): Dream => ({
  id,
  createdAt: daysAgo(1),
  rawText: '',
  analysis: { ...sampleAnalyses[0], title, tags: [tag], objects: [{ ...sampleAnalyses[0].objects[0], art: a }] },
  panels: makePanels(0, 4).map((p, i) => (i === 0 ? { ...p, art: a } : p)),
  style: 'manga',
  visibility: 'public',
  favorite: false,
  likes,
  category,
  author,
});

export const exploreDreams: Dream[] = [
  publicDream('e1', 'Alacakaranlıkta cam orman', 'orman', art.glass, 128, 'Sürreal', 'deniz'),
  publicDream('e2', 'Yüzen pazar', 'su', art.market, 64, 'Mekânlar', 'mert.k'),
  publicDream('e3', 'Hiçliğe çıkan merdiven', 'düşmek', art.stairs, 212, 'Kâbuslar', 'ela'),
  publicDream('e4', 'Kâğıt kuşlar', 'uçmak', art.birds, 96, 'Uçmak', 'arda'),
  publicDream('e5', 'Saatler odası', 'zaman', art.clocks, 41, 'Sürreal', 'zeynep'),
  publicDream('e6', 'Su altı kütüphanesi', 'kitap', art.library, 307, 'Mekânlar', 'can'),
  publicDream('e7', 'Öğle vakti tuz çölü', 'ışık', art.desert, 53, 'Mekânlar', 'irem'),
  publicDream('e8', 'Bitmeyen tren', 'yolculuk', art.train, 145, 'Uçmak', 'ozan'),
];

export const matches: Match[] = [
  { id: 'm1', username: 'ela', avatar: art.rain, similarity: 87, sharedSymbols: ['cam', 'uçmak'], dreamTitle: 'Camdan bir kule' },
  { id: 'm2', username: 'arda', avatar: art.birds, similarity: 74, sharedSymbols: ['kuş', 'anahtar'], dreamTitle: 'Kâğıt kuşlar' },
  { id: 'm3', username: 'zeynep', avatar: art.snow, similarity: 61, sharedSymbols: ['pencere'], dreamTitle: 'Açık pencereli koridor' },
];

export const messages: Record<string, Message[]> = {
  m1: [
    { id: '1', fromMe: false, text: 'Senin cam şehir rüyanı gördüm, ben de geçen hafta camdan bir kule gördüm!', time: '22:14' },
    { id: '2', fromMe: true, text: 'Ciddi mi? Sende de çan sesi var mıydı?', time: '22:16' },
  ],
};

export const profile: Profile = {
  username: 'cenker',
  displayName: 'Cenker',
  streak: 6,
  dreamCount: 42,
  xp: 420,
  weeklyGoal: { done: 4, total: 7 },
  badges: ['7 gece', 'İlk uçuş', 'Berrak x3', 'Gece kuşu'],
  symbols: [
    { label: 'Su', count: 9 },
    { label: 'Uçmak', count: 7 },
    { label: 'Cam', count: 5 },
    { label: 'Kapılar', count: 4 },
    { label: 'Yabancılar', count: 3 },
  ],
  plan: 'free',
};
