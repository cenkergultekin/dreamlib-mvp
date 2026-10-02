import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art, Button, Screen, T, ToggleRow } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { art } from '@/services/mock-data';
import type { Visibility } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, palette, radius, space } from '@/theme/tokens';

const cover = [art.glass, art.birds, art.stairs, art.market, art.clocks, art.train];

export default function Onboarding() {
  const { c } = useTheme();
  const [step, setStep] = useState(0);
  const [auth, setAuth] = useState('email');
  const [visibility, setVisibility] = useState<Visibility>('private');
  const [research, setResearch] = useState(false);
  const [reminder, setReminder] = useState(true);
  const s = tr.onboarding.steps[step];
  const last = step === tr.onboarding.steps.length - 1;

  const next = () => {
    if (!last) return setStep(step + 1);
    router.dismissAll();
    router.replace('/tell');
  };

  const option = (key: string, label: string, detail: string, on: boolean, onPress: () => void) => (
    <Pressable key={key} onPress={onPress} style={[styles.option, { backgroundColor: on ? palette.lavender : c.card, borderColor: c.line, boxShadow: on ? `4px 4px 0 ${c.shadow}` : 'none' }]}>
      <View style={[styles.radio, { borderColor: c.line, backgroundColor: on ? palette.lime : palette.paper }]} />
      <View style={{ flex: 1 }}>
        <T v="h3" color={on ? palette.ink : undefined}>{label}</T>
        {detail ? <T v="small" color={on ? palette.ink : undefined}>{detail}</T> : null}
      </View>
    </Pressable>
  );

  return (
    <Screen footer={<Button label={step === 0 ? tr.onboarding.start : last ? tr.onboarding.finish : tr.common.continue} onPress={next} />}>
      <View style={styles.dots}>
        {tr.onboarding.steps.map((_, i) => (
          <View key={i} style={[styles.dot, { backgroundColor: i <= step ? palette.purple : c.card, borderColor: c.line }]} />
        ))}
      </View>

      {step === 0 ? (
        <View style={styles.collage}>
          {cover.map((a, i) => (
            <Art key={i} colors={a} style={{ width: '31%', height: i % 2 ? 120 : 150 }} />
          ))}
        </View>
      ) : null}

      <View style={{ gap: space.sm }}>
        <T v="hero">{s.title}</T>
        <T>{s.body}</T>
      </View>

      {step === 1 ? tr.onboarding.auth.map((a) => option(a.key, a.label, a.detail, auth === a.key, () => setAuth(a.key))) : null}

      {step === 2 ? (
        <>
          {option('private', tr.manga.visibility.private, 'Kütüphanende kalır', visibility === 'private', () => setVisibility('private'))}
          {option('public', tr.manga.visibility.public, 'Keşfet akışına düşer, kullanıcı adınla', visibility === 'public', () => setVisibility('public'))}
          <ToggleRow label={tr.onboarding.research} value={research} onChange={setResearch} />
        </>
      ) : null}

      {step === 3 ? <ToggleRow label={tr.onboarding.reminder} value={reminder} onChange={setReminder} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: 'row', gap: 6, paddingTop: space.md },
  dot: { flex: 1, height: 10, borderRadius: radius.pill, borderWidth: 2 },
  collage: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: space.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.lg, borderRadius: radius.md, borderWidth: border },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: border },
});
