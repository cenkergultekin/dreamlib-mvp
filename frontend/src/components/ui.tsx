import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Path, Pattern, Rect } from 'react-native-svg';

import { Lib, type LibMood } from '@/components/lib';
import type { Art as ArtColors } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, radius, shadowOffset, space, tones, type Tone } from '@/theme/tokens';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export function Icon({ name, size = 20, color }: { name: IconName; size?: number; color?: string }) {
  const { c } = useTheme();
  return <Ionicons name={name} size={size} color={color ?? c.text} />;
}

/** Graph-paper canvas behind every screen. */
function Grid() {
  const { c } = useTheme();
  return (
    <Svg width="100%" height="100%" style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <Defs>
        <Pattern id="grid" width={28} height={28} patternUnits="userSpaceOnUse">
          <Path d="M 28 0 L 0 0 0 28" fill="none" stroke={c.grid} strokeWidth={1} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
}

type ScreenProps = { children: ReactNode; scroll?: boolean; footer?: ReactNode; padded?: boolean; inTabs?: boolean };

/**
 * Page shell: safe area, grid canvas, optional scroll and a pinned footer for the main action.
 * `inTabs` lifts the footer above the floating tab bar.
 */
export function Screen({ children, scroll = true, footer, padded = true, inTabs }: ScreenProps) {
  const { c } = useTheme();
  const pad = padded ? { paddingHorizontal: space.xl } : null;
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
      <Grid />
      {scroll ? (
        <ScrollView contentContainerStyle={[pad, { paddingBottom: 130, gap: space.lg }]} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, pad]}>{children}</View>
      )}
      {footer ? (
        <View style={[styles.footer, { backgroundColor: c.bg, borderTopColor: c.line }, inTabs && { paddingBottom: 112 }]}>{footer}</View>
      ) : null}
    </SafeAreaView>
  );
}

const variants = {
  hero: { fontFamily: fonts.display, fontSize: 36, lineHeight: 38, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.display, fontSize: 28, lineHeight: 32, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.display, fontSize: 21, lineHeight: 25 },
  h3: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  small: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.bold, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
} satisfies Record<string, TextStyle>;

type TProps = { children: ReactNode; v?: keyof typeof variants; color?: string; style?: StyleProp<TextStyle>; numberOfLines?: number };

export function T({ children, v = 'body', color, style, numberOfLines }: TProps) {
  const { c } = useTheme();
  const base = v === 'body' || v === 'small' ? c.body : v === 'label' ? c.muted : c.text;
  return (
    <Text numberOfLines={numberOfLines} style={[variants[v], { color: color ?? base }, style]}>
      {children}
    </Text>
  );
}

/** Ink outline + hard offset shadow: the base of every raised element. */
function useBrutal(pressed = false, offset = shadowOffset) {
  const { c } = useTheme();
  const o = pressed ? 1 : offset;
  return {
    borderWidth: border,
    borderColor: c.line,
    boxShadow: `${o}px ${o}px 0 ${c.shadow}`,
    transform: [{ translateX: offset - o }, { translateY: offset - o }],
  } satisfies ViewStyle;
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, style }: ButtonProps) {
  const { c } = useTheme();
  const off = disabled || loading;
  if (variant === 'ghost') {
    return (
      <Pressable onPress={onPress} disabled={off} style={[styles.ghost, { opacity: off ? 0.5 : 1 }, style]}>
        {icon ? <Icon name={icon} size={18} /> : null}
        <Text style={[variants.h3, { color: c.text, textDecorationLine: 'underline' }]}>{label}</Text>
      </Pressable>
    );
  }
  const bg = variant === 'primary' ? c.action : tones.paper;
  const fg = variant === 'primary' ? c.onAction : '#121016';
  return (
    <Pressable onPress={onPress} disabled={off} style={[{ opacity: off ? 0.55 : 1 }, style]}>
      {({ pressed }) => (
        <BrutalBox pressed={pressed} style={[styles.button, { backgroundColor: bg }]}>
          {loading ? <Lib mood="thinking" size={26} /> : icon ? <Icon name={icon} size={19} color={fg} /> : null}
          <Text style={[variants.h3, { fontSize: 16, color: fg }]}>{loading ? '…' : label}</Text>
        </BrutalBox>
      )}
    </Pressable>
  );
}

function BrutalBox({ pressed, style, children }: { pressed?: boolean; style?: StyleProp<ViewStyle>; children: ReactNode }) {
  return <View style={[useBrutal(pressed), style]}>{children}</View>;
}

export function Chip({ label, selected, onPress, tone }: { label: string; selected?: boolean; onPress?: () => void; tone?: Tone }) {
  const { c } = useTheme();
  const bg = selected ? c.accent : tone ? tones[tone] : c.chip;
  const fg = selected ? c.onAccent : tone ? '#121016' : c.text;
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.chip, { backgroundColor: bg, borderColor: c.line }]}>
      <Text style={[variants.small, { fontFamily: fonts.bold, color: fg }]}>{label}</Text>
    </Pressable>
  );
}

type CardProps = { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; tone?: Tone };

/** Raised block. A tone paints it in a flat color; text inside a toned card should stay ink. */
export function Card({ children, style, onPress, tone }: CardProps) {
  const { c } = useTheme();
  const bg = { backgroundColor: tone ? tones[tone] : c.card };
  if (!onPress) return <BrutalBox style={[styles.card, bg, style]}>{children}</BrutalBox>;
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <BrutalBox pressed={pressed} style={[styles.card, bg, style]}>
          {children}
        </BrutalBox>
      )}
    </Pressable>
  );
}

/** Placeholder for generated art: flat block, a moon-ish disc and a sparkle. */
export function Art({ colors, height, style, children }: { colors: ArtColors; height?: number; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={[{ height, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors[0], borderWidth: border, borderColor: c.line }, style]}>
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Circle cx={68} cy={38} r={22} fill={colors[1]} stroke="#121016" strokeWidth={1.5} />
        <Path d="M24 22 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={colors[2] ?? '#FFFDF7'} stroke="#121016" strokeWidth={1.2} />
        <Path d="M0 82 Q 25 70 50 82 T 100 80 V100 H0z" fill={colors[2] ?? colors[1]} stroke="#121016" strokeWidth={1.5} />
      </Svg>
      {children}
    </View>
  );
}

export function Segmented<K extends string>({ options, value, onChange }: { options: { key: K; label: string }[]; value: K; onChange: (k: K) => void }) {
  const { c } = useTheme();
  return (
    <View style={[styles.segmented, { backgroundColor: c.card, borderColor: c.line }]}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <Pressable key={o.key} onPress={() => onChange(o.key)} style={[styles.segment, on && { backgroundColor: c.accent, borderColor: c.line, borderWidth: 2 }]}>
            <Text style={[variants.small, { fontFamily: fonts.bold, color: on ? c.onAccent : c.muted }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { c } = useTheme();
  return (
    <View style={styles.row}>
      <T style={{ flex: 1 }} color={c.text}>
        {label}
      </T>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: c.accent, false: c.faint }} thumbColor="#FFFDF7" />
    </View>
  );
}

export function TopBar({ title, right }: { title?: string; right?: ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={[styles.row, { paddingVertical: space.sm }]}>
      <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={12}>
        {({ pressed }) => (
          <BrutalBox pressed={pressed} style={[styles.square, { backgroundColor: c.card }]}>
            <Icon name="arrow-back" />
          </BrutalBox>
        )}
      </Pressable>
      <T v="h3" style={{ flex: 1, textAlign: 'center' }} numberOfLines={1}>
        {title ?? ''}
      </T>
      <View style={{ minWidth: 42, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export function Section({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: ReactNode }) {
  return (
    <View style={{ gap: space.md }}>
      <View style={styles.row}>
        <T v="h2" style={{ flex: 1 }}>
          {title}
        </T>
        {action ? (
          <Pressable onPress={onAction} hitSlop={8}>
            <T v="label" style={{ textDecorationLine: 'underline' }}>
              {action} →
            </T>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

/** Waiting states are Lib's moment: the mascot does the work on screen. */
export function Loading({ label, mood = 'thinking' }: { label: string; mood?: LibMood }) {
  return (
    <View style={styles.loading}>
      <Lib mood={mood} size={130} bounce />
      {label ? <T v="h2" style={{ textAlign: 'center' }}>{label}</T> : null}
    </View>
  );
}

export function Bar({ pct, color }: { pct: number; color: string }) {
  const { c } = useTheme();
  return (
    <View style={{ height: 14, borderRadius: radius.pill, backgroundColor: c.card, borderWidth: 2, borderColor: c.line, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRightWidth: 2, borderColor: c.line }} />
    </View>
  );
}

export function Badge({ label, tone = 'pink' }: { label: string; tone?: Tone }) {
  const { c } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: tones[tone], borderColor: c.line }]}>
      <Text style={[variants.label, { fontSize: 9, color: '#121016' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, paddingBottom: space.xxl, borderTopWidth: border, gap: space.sm },
  button: { minHeight: 56, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm, paddingHorizontal: space.xl },
  ghost: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm },
  chip: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.pill, borderWidth: 2 },
  card: { borderRadius: radius.lg, padding: space.lg, gap: space.sm },
  segmented: { flexDirection: 'row', borderRadius: radius.pill, padding: 4, borderWidth: border },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  square: { width: 42, height: 42, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.xl, paddingVertical: 60, paddingHorizontal: space.xl },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, borderWidth: 2 },
});
