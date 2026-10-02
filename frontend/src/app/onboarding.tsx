import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Brand } from '@/components/brand';
import { DreamStage } from '@/components/dream-stage';
import { Button, Card, IconButton, Screen, T, ToggleRow } from '@/components/ui';
import { tr } from '@/i18n/tr';
import type { Visibility } from '@/services/types';
import { useSession } from '@/state/session';
import { useTheme } from '@/theme/theme';
import { border, palette, radius, space } from '@/theme/tokens';

const o = tr.onboarding;

export default function Onboarding() {
  const { c } = useTheme();
  const { finish } = useSession();
  const [step, setStep] = useState(0);
  const [guest, setGuest] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>('private');
  const [research, setResearch] = useState(false);
  const [reminder, setReminder] = useState(true);

  const done = () => {
    finish(guest);
    router.replace(guest ? '/' : '/tell');
  };

  const dots = (
    <View style={styles.dots}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={[styles.dot, { borderColor: c.line, backgroundColor: i === step ? c.lime : c.card }, i === step && { width: 34 }]} />
      ))}
    </View>
  );

  if (step === 0) {
    return (
      <Screen scroll={false}>
        <View style={{ flex: 1, paddingVertical: space.lg, gap: space.lg }}>
          <Card tone="lavender" style={styles.hero}>
            <Brand />
            <View style={styles.heroArt}>
              <DreamStage size={300} />
            </View>
            <T v="hero" color={palette.ink}>
              {o.welcome.title}
            </T>
            <View style={styles.heroFoot}>
              {dots}
              <IconButton name="arrow-forward" tone="lime" size={60} onPress={() => setStep(1)} label={tr.common.continue} />
            </View>
          </Card>
        </View>
      </Screen>
    );
  }

  if (step === 1) {
    return (
      <Screen
        footer={
          <>
            <Button label={o.auth.email} icon="mail" onPress={() => setStep(2)} />
            <Button label={o.auth.apple} icon="logo-apple" variant="dark" onPress={() => setStep(2)} />
            <Button label={o.auth.google} icon="logo-google" variant="secondary" onPress={() => setStep(2)} />
            <Button
              label={o.auth.guest}
              variant="ghost"
              onPress={() => {
                setGuest(true);
                setStep(3);
              }}
            />
          </>
        }>
        {dots}
        <View style={{ alignItems: 'center', paddingTop: space.xl }}>
          <DreamStage size={170} />
        </View>
        <T v="hero">{o.auth.title}</T>
        <T>{o.auth.body}</T>
      </Screen>
    );
  }

  if (step === 2) {
    const option = (key: Visibility, label: string, detail: string) => {
      const on = visibility === key;
      return (
        <Pressable key={key} onPress={() => setVisibility(key)} style={[styles.option, { borderColor: c.line, backgroundColor: on ? c.purple : c.card }]}>
          <View style={[styles.radio, { borderColor: c.line, backgroundColor: on ? c.lime : c.card }]} />
          <View style={{ flex: 1, gap: 2 }}>
            <T v="h2" color={on ? '#FFFFFF' : undefined}>
              {label}
            </T>
            <T color={on ? '#FFFFFF' : undefined}>{detail}</T>
          </View>
        </Pressable>
      );
    };
    return (
      <Screen footer={<Button label={tr.common.continue} onPress={() => setStep(3)} />}>
        {dots}
        <T v="hero">{o.privacy.title}</T>
        <T>{o.privacy.body}</T>
        {option('private', o.privacy.private, o.privacy.privateDetail)}
        {option('public', o.privacy.public, o.privacy.publicDetail)}
        <Card style={{ paddingVertical: space.md }}>
          <ToggleRow label={o.privacy.research} value={research} onChange={setResearch} />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen footer={<Button label={guest ? o.finishGuest : o.finish} onPress={done} />}>
      {dots}
      <View style={{ alignItems: 'center', paddingTop: space.xl }}>
        <DreamStage size={190} />
      </View>
      <T v="hero">{o.reminder.title}</T>
      <T>{o.reminder.body}</T>
      <Card style={{ paddingVertical: space.md }}>
        <ToggleRow label={o.reminder.toggle} value={reminder} onChange={setReminder} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, padding: space.xxl, gap: space.md, justifyContent: 'flex-end' },
  heroArt: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: space.lg },
  dots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: radius.pill, borderWidth: 2 },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.lg, padding: space.xl, borderRadius: radius.lg, borderWidth: border },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: border },
});
