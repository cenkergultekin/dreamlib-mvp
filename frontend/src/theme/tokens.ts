// Single source for colors, type and spacing. Direction: playful neo-brutalism
// (thick ink outlines, hard offset shadows, flat saturated blocks). Change the look here only.

export const palette = {
  ink: '#121016',
  cream: '#FFF6E6',
  paper: '#FFFDF7',
  lavender: '#B8A4FF',
  purple: '#7B5CFF',
  lime: '#D7FF3D',
  pink: '#FF9BD2',
  orange: '#FF8A4C',
  sky: '#8FD3FF',
  yellow: '#FFD84D',
};

/** Flat block colors for cards, chips and placeholder art. */
export const tones = {
  lavender: palette.lavender,
  lime: palette.lime,
  pink: palette.pink,
  orange: palette.orange,
  sky: palette.sky,
  yellow: palette.yellow,
  paper: palette.paper,
};
export type Tone = keyof typeof tones;

const light = {
  bg: palette.cream,
  grid: 'rgba(18,16,22,0.06)',
  card: palette.paper,
  text: palette.ink,
  body: '#3B3646',
  muted: '#6E6880',
  faint: '#9C96AD',
  line: palette.ink,
  shadow: palette.ink,
  chip: palette.paper,
  accent: palette.purple,
  onAccent: '#FFFFFF',
  action: palette.lime,
  onAction: palette.ink,
  navBg: palette.ink,
  navActive: palette.lime,
  danger: '#E5484D',
};

export type Colors = typeof light;

// Night variant (pins 04/05): ink canvas, the same colored blocks pop on it.
const dark: Colors = {
  bg: '#16131F',
  grid: 'rgba(255,246,230,0.05)',
  card: '#241F33',
  text: palette.cream,
  body: '#D9D2E8',
  muted: '#A69FBC',
  faint: '#7A7392',
  line: palette.ink,
  shadow: palette.lime,
  chip: '#241F33',
  accent: palette.lavender,
  onAccent: palette.ink,
  action: palette.lime,
  onAction: palette.ink,
  navBg: '#0B0A10',
  navActive: palette.lime,
  danger: '#FF7A80',
};

export const colors = { light, dark };
export type Scheme = keyof typeof colors;

export const fonts = {
  display: 'ArchivoBlack_400Regular',
  regular: 'SpaceGrotesk_500Medium',
  bold: 'SpaceGrotesk_700Bold',
};

export const border = 2.5;
export const shadowOffset = 4;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };
export const radius = { sm: 10, md: 16, lg: 22, pill: 999 };
