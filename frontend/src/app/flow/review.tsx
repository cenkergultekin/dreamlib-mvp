import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Badge, Button, Chip, Loading, Screen, Section, T, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { interpretDream } from '@/services/api';
import type { InterpretationType } from '@/services/types';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius, space } from '@/theme/tokens';

const types: InterpretationType[] = ['universal', 'cultural', 'psychoanalytic'];

export default function Review() {
  const { c } = useTheme();
  const { draft, update } = useDraft();
  const [text, setText] = useState(draft.cleanText);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    const analysis = await interpretDream(text, draft.interpretationType, draft.analysisIndex);
    update({ cleanText: text, analysis });
    setBusy(false);
    router.push('/flow/analysis');
  };

  if (busy) return <Screen scroll={false}><Loading label={tr.review.interpreting} /></Screen>;

  return (
    <Screen footer={<Button label={tr.review.submit} onPress={submit} disabled={text.trim().length < 10} />}>
      <TopBar />
      <View style={{ gap: 6 }}>
        <T v="h1">{tr.review.title}</T>
        <T>{tr.review.sub}</T>
      </View>

      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
      />

      <Section title={tr.review.tags}>
        <View style={styles.wrap}>
          {draft.tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </Section>

      <Section title={tr.review.typeTitle}>
        {types.map((key) => {
          const on = draft.interpretationType === key;
          const info = tr.review.types[key];
          return (
            <Pressable
              key={key}
              onPress={() => update({ interpretationType: key })}
              style={[styles.option, { backgroundColor: on ? palette.lavender : c.card, borderColor: c.line, boxShadow: on ? `4px 4px 0 ${c.shadow}` : 'none' }]}>
              <View style={[styles.radio, { borderColor: c.line, backgroundColor: on ? palette.lime : palette.paper }]} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="h3" color={on ? palette.ink : undefined}>{info.label}</T>
                <T v="small" color={on ? palette.ink : undefined}>{info.detail}</T>
              </View>
              {key === 'psychoanalytic' ? <Badge label={tr.common.premium} /> : null}
            </Pressable>
          );
        })}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 140, borderRadius: radius.lg, padding: space.lg, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, textAlignVertical: 'top', borderWidth: border },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.lg, borderRadius: radius.md, borderWidth: border },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: border },
});
