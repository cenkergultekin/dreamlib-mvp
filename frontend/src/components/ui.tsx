import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { Lib, type LibMood } from '@/components/lib';
import type { Art as ArtColors } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, onTone, palette, radius, space, toneFill, type Tone } from '@/theme/tokens';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export function Icon({ name, size = 22, color }: { name: IconName; size?: number; color?: string }) {
  const { c } = useTheme();
  return <Ionicons name={name} size={size} color={color ?? c.text} />;
}

type ScreenProps = { children: ReactNode; scroll?: boolean; footer?: ReactNode; padded?: boolean; bg?: string };

/** Page shell: safe area, background, optional scroll and a pinned footer for the one main action. */
export function Screen({ children, scroll = true, footer, padded = true, bg }: ScreenProps) {
  const { c } = useTheme();
  const pad = padded ? { paddingHorizontal: space.xl } : null;
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: bg ?? c.bg }}>
      {scroll ? (
        <ScrollView contentContainerStyle={[pad, { paddingTop: space.md, paddingBottom: space.xxl * 2, gap: space.xl }]} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, pad]}>{children}</View>
      )}
      {footer ? <View style={[styles.footer, { backgroundColor: bg ?? c.bg }]}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const variants = {
  hero: { fontFamily: fonts.heavy, fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  h1: { fontFamily: fonts.heavy, fontSize: 30, lineHeight: 35, letterSpacing: -0.6 },
  h2: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  h3: { fontFamily: fonts.medium, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 25 },
  small: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 21 },
} satisfies Record<string, TextStyle>;

type TProps = { children: ReactNode; v?: keyof typeof variants; color?: string; style?: StyleProp<TextStyle>; numberOfLines?: number };

export function T({ children, v = 'body', color, style, numberOfLines }: TProps) {
  const { c } = useTheme();
  const base = v === 'body' || v === 'small' ? c.body : c.text;
  return (
    <Text numberOfLines={numberOfLines} style={[variants[v], { color: color ?? base }, style]}>
      {children}
    </Text>
  );
}

/** Quiet surface; interaction changes opacity rather than moving the layout. */
function brutal(c: { line: string; shadow: string }, pressed = false): ViewStyle {
  return {
    borderWidth: border,
    borderColor: c.line,
    opacity: pressed ? 0.8 : 1,
  };
}

type PressBoxProps = { onPress?: () => void; disabled?: boolean; style?: StyleProp<ViewStyle>; children: ReactNode; flat?: boolean; label?: string };

/**
 * The single pressable surface. Layout style (flex, width, margins) and visuals live on the same
 * element, so pressable and static boxes size the same.
 */
export function PressBox({ onPress, disabled, style, children, flat, label }: PressBoxProps) {
  const { c } = useTheme();
  if (!onPress) return <View style={[!flat && brutal(c), style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [!flat && brutal(c, pressed && !disabled), { opacity: disabled ? 0.5 : pressed ? 0.8 : 1 }, style]}>
      {children}
    </Pressable>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** primary = lime (the 10%), secondary = paper, dark = ink like the references' bottom buttons. */
export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, style }: ButtonProps) {
  const { c } = useTheme();
  if (variant === 'ghost') {
    return (
      <Pressable onPress={onPress} disabled={disabled || loading} style={[styles.ghost, style]}>
        {icon ? <Icon name={icon} size={20} /> : null}
        <Text style={[variants.h3, { color: c.text, textDecorationLine: 'underline' }]}>{label}</Text>
      </Pressable>
    );
  }
  const bg = variant === 'primary' ? c.lime : variant === 'dark' ? palette.ink : c.card;
  const fg = variant === 'primary' ? palette.ink : variant === 'dark' ? '#FFFFFF' : c.text;
  return (
    <PressBox onPress={onPress} disabled={disabled || loading} label={label} style={[styles.button, { backgroundColor: bg }, style]}>
      {loading ? <Lib mood="thinking" size={30} /> : icon ? <Icon name={icon} size={22} color={fg} /> : null}
      <Text style={[variants.h3, { fontFamily: fonts.bold, color: fg }]}>{label}</Text>
    </PressBox>
  );
}

/** Round icon button (back, close, next) as in the references. */
export function IconButton({ name, onPress, tone = 'paper', size = 48, label }: { name: IconName; onPress: () => void; tone?: Tone; size?: number; label?: string }) {
  const { c } = useTheme();
  return (
    <PressBox onPress={onPress} label={label} style={[styles.center, { width: size, height: size, borderRadius: size / 2, backgroundColor: toneFill(c, tone) }]}>
      <Icon name={name} size={size * 0.46} color={onTone(c, tone)} />
    </PressBox>
  );
}

export function Chip({ label, selected, onPress, tone }: { label: string; selected?: boolean; onPress?: () => void; tone?: Tone }) {
  const { c } = useTheme();
  const t: Tone = selected ? 'purple' : tone ?? 'paper';
  const box = [styles.chip, { backgroundColor: toneFill(c, t), borderColor: c.line }];
  const text = <Text style={[variants.small, { fontFamily: fonts.medium, color: onTone(c, t) }]}>{label}</Text>;
  return onPress ? (
    <Pressable onPress={onPress} style={box}>
      {text}
    </Pressable>
  ) : (
    <View style={box}>{text}</View>
  );
}

type CardProps = { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; tone?: Tone };

export function Card({ children, style, onPress, tone = 'paper' }: CardProps) {
  const { c } = useTheme();
  return (
    <PressBox flat onPress={onPress} style={[styles.card, { backgroundColor: toneFill(c, tone) }, style]}>
      {children}
    </PressBox>
  );
}

/** Placeholder for generated art: flat block, a disc and a sparkle, ink outlines. */
export function Art({ colors, height, style, children }: { colors: ArtColors; height?: number; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={[{ height, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors[0], borderWidth: border, borderColor: c.line }, style]}>
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Circle cx={75} cy={28} r={30} fill={colors[1]} />
        <Path d="M0 70 Q 30 38 60 72 T 110 56 V100 H0z" fill={colors[2] ?? colors[1]} />
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
          <Pressable key={o.key} onPress={() => onChange(o.key)} style={[styles.segment, on && { backgroundColor: c.purple, borderColor: c.line, borderWidth: 2 }]}>
            <Text style={[variants.h3, { fontFamily: fonts.bold, fontSize: 16, color: on ? '#FFFFFF' : c.body }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={() => onChange(!value)} style={styles.row}>
      <T style={{ flex: 1 }} color={c.text}>
        {label}
      </T>
      <Toggle value={value} onChange={onChange} />
    </Pressable>
  );
}

// react-native-web paints the active thumb teal unless told otherwise; the prop is web-only.
const webThumb = { activeThumbColor: '#FFFFFF' } as object;

export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  const { c } = useTheme();
  return <Switch value={value} onValueChange={onChange} trackColor={{ true: c.purple, false: c.placeholder }} thumbColor="#FFFFFF" {...webThumb} />;
}

export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

export function TopBar({ title, right }: { title?: string; right?: ReactNode }) {
  return (
    <View style={[styles.row, { paddingVertical: space.xs }]}>
      <IconButton name="arrow-back" onPress={goBack} label="Geri" size={46} />
      <T v="h3" style={{ flex: 1, textAlign: 'center', fontFamily: fonts.bold }} numberOfLines={1}>
        {title ?? ''}
      </T>
      <View style={{ minWidth: 46, alignItems: 'flex-end' }}>{right}</View>
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
          <Pressable onPress={onAction} hitSlop={10}>
            <T v="small" style={{ fontFamily: fonts.medium, textDecorationLine: 'underline' }}>
              {action}
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
      <Lib mood={mood} size={150} bounce />
      {label ? (
        <T v="h1" style={{ textAlign: 'center' }}>
          {label}
        </T>
      ) : null}
    </View>
  );
}

export function Bar({ pct, color }: { pct: number; color: string }) {
  const { c } = useTheme();
  return (
    <View style={{ height: 16, borderRadius: radius.pill, backgroundColor: c.card, borderWidth: 2, borderColor: c.line, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRightWidth: 2, borderColor: c.line }} />
    </View>
  );
}

export function Badge({ label }: { label: string }) {
  const { c } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: c.lime, borderColor: c.line }]}>
      <Text style={[variants.small, { fontSize: 12, fontFamily: fonts.bold, color: palette.ink }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, paddingBottom: space.xl, gap: space.sm },
  button: { minHeight: 60, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm, paddingHorizontal: space.xl },
  ghost: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm },
  chip: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill, borderWidth: 1 },
  card: { borderRadius: radius.lg, padding: space.xl, gap: space.sm },
  center: { alignItems: 'center', justifyContent: 'center' },
  segmented: { flexDirection: 'row', borderRadius: radius.pill, padding: 5, borderWidth: border },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.xl, paddingVertical: 60, paddingHorizontal: space.xl },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, borderWidth: 2 },
});
