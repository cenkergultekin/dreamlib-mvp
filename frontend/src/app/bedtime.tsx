import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Card, Chip, Loading, Screen, Section, T, ToggleRow, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { getBedtimeInsight } from '@/services/api';
import type { BedtimeInsight } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius, space } from '@/theme/tokens';

export default function Bedtime() {
  const { c } = useTheme();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [insight, setInsight] = useState<BedtimeInsight | null>(null);
  const [remind, setRemind] = useState(true);

  const submit = async () => {
    setBusy(true);
    setInsight(await getBedtimeInsight(text));
    setBusy(false);
  };

  if (busy) return <Screen scroll={false}><Loading label="Lib düşünüyor…" mood="sleepy" /></Screen>;

  return (
    <Screen footer={insight ? undefined : <Button label={tr.bedtime.submit} icon="moon" onPress={submit} disabled={text.trim().length < 5} />}>
      <TopBar />
      <View style={{ gap: 6 }}>
        <Lib mood="sleepy" size={90} />
        <T v="h1">{tr.bedtime.title}</T>
        <T>{tr.bedtime.sub}</T>
      </View>

      <TextInput
        value={text}
        onChangeText={setText}
        editable={!insight}
        placeholder={tr.bedtime.placeholder}
        placeholderTextColor={c.faint}
        multiline
        style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
      />

      {insight ? (
        <>
          <Card tone="sky">
            <T color={palette.ink}>{insight.note}</T>
          </Card>
          <Section title={tr.bedtime.possible}>
            <View style={{ flexDirection: 'row', gap: space.sm }}>
              {insight.possibleSymbols.map((s) => (
                <Chip key={s} label={s} tone="lime" />
              ))}
            </View>
          </Section>
          <ToggleRow label={tr.bedtime.remind} value={remind} onChange={setRemind} />
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 120, borderRadius: radius.lg, padding: space.lg, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, textAlignVertical: 'top', borderWidth: border },
});
