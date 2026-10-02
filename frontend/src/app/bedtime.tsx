import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Card, Chip, Loading, Screen, Section, T, ToggleRow, TopBar, goBack } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { getBedtimeInsight } from '@/services/api';
import type { BedtimeInsight } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, radius, space } from '@/theme/tokens';

export default function Bedtime() {
  const { c } = useTheme();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [insight, setInsight] = useState<BedtimeInsight | null>(null);
  const [remind, setRemind] = useState(true);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setInsight(await getBedtimeInsight(text));
    setBusy(false);
  };

  if (busy)
    return (
      <Screen scroll={false}>
        <Loading label={tr.bedtime.thinking} mood="sleepy" />
      </Screen>
    );

  return (
    <Screen
      footer={
        insight ? (
          <Button label={tr.bedtime.done} icon="moon" variant="dark" onPress={goBack} />
        ) : (
          <Button label={tr.bedtime.submit} icon="moon" onPress={submit} disabled={text.trim().length < 5} />
        )
      }>
      <TopBar />
      <View style={{ alignItems: 'center' }}>
        <Lib mood="sleepy" size={140} bounce />
      </View>
      <T v="hero">{tr.bedtime.title}</T>
      <T>{tr.bedtime.sub}</T>

      <TextInput
        value={text}
        onChangeText={setText}
        editable={!insight}
        placeholder={tr.bedtime.placeholder}
        placeholderTextColor={c.placeholder}
        multiline
        style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
      />

      {insight ? (
        <>
          <Card tone="purple">
            <T color="#FFFFFF">{insight.note}</T>
          </Card>
          <Section title={tr.bedtime.possible}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
              {insight.possibleSymbols.map((s) => (
                <Chip key={s} label={`#${s}`} tone="lime" />
              ))}
            </View>
          </Section>
          <Card style={{ paddingVertical: space.md }}>
            <ToggleRow label={tr.bedtime.remind} value={remind} onChange={setRemind} />
          </Card>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 140, borderRadius: radius.lg, padding: space.xl, fontFamily: fonts.regular, fontSize: 18, lineHeight: 27, textAlignVertical: 'top', borderWidth: border },
});
