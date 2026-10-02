// Single source for colors, type and spacing. Direction: simple, big, playful neo-brutalism.
// Color rule 60-30-10: 60% cream/paper surfaces, 30% purple family, 10% lime for the main action.

export const palette = {
  ink: '#121016',
  cream: '#F5F2EA',
  paper: '#FFFDF8',
  purple: '#7860CF',
  lavender: '#E4DDF5',
  lime: '#D7FF3D',
};

/** Card fills allowed by the 60-30-10 rule. */
export type Tone = 'paper' | 'purple' | 'lavender' | 'lime';

const light = {
  bg: palette.cream,
  card: palette.paper,
  text: palette.ink,
  body: '#2B2735',
  placeholder: 'rgba(18,16,22,0.4)',
  line: '#DDD8E4',
  shadow: palette.ink,
  purple: palette.purple,
  lavender: palette.lavender,
  lime: palette.lime,
  navBg: palette.paper,
  danger: '#D93A50',
};

export type Colors = typeof light;

const dark: Colors = {
  bg: '#15121E',
  card: '#231E32',
  text: palette.cream,
  body: '#E7E1F2',
  placeholder: 'rgba(255,246,230,0.4)',
  line: '#000000',
  shadow: palette.purple,
  purple: palette.purple,
  lavender: '#9D8BFF',
  lime: palette.lime,
  navBg: '#231E32',
  danger: '#FF7A85',
};

export const colors = { light, dark };
export type Scheme = keyof typeof colors;

export function toneFill(c: Colors, tone: Tone) {
  return { paper: c.card, purple: c.purple, lavender: c.lavender, lime: c.lime }[tone];
}

/** Text color that reads on a given fill. */
export function onTone(c: Colors, tone: Tone) {
  return tone === 'purple' ? '#FFFFFF' : tone === 'paper' ? c.text : palette.ink;
}

export const fonts = {
  regular: 'Lexend_400Regular',
  medium: 'Lexend_500Medium',
  bold: 'Lexend_700Bold',
  heavy: 'Lexend_800ExtraBold',
};

export const border = 1;
export const shadowOffset = 0;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };
export const radius = { sm: 12, md: 18, lg: 26, pill: 999 };
