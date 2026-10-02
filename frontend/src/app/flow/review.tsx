import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Badge, Button, Chip, Loading, Screen, Section, T, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { interpretDream } from '@/services/api';
import type { InterpretationType } from '@/services/types';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { border, fonts, radius, space } from '@/theme/tokens';

const types: InterpretationType[] = ['universal', 'cultural', 'psychoanalytic'];

export default function Review() {
  const { c } = useTheme();
  const { draft, update } = useDraft();
  const [text, setText] = useState(draft.cleanText);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    const analysis = await interpretDream(text, draft.interpretationType, draft.analysisIndex);
    update({ cleanText: text, analysis });
    setBusy(false);
    router.push('/flow/analysis');
  };

  if (busy)
    return (
      <Screen scroll={false}>
        <Loading label={tr.review.interpreting} />
      </Screen>
    );

  return (
    <Screen footer={<Button label={tr.review.submit} onPress={submit} disabled={text.trim().length < 10} />}>
      <TopBar />
      <View style={{ gap: space.sm }}>
        <T v="h1">{tr.review.title}</T>
        <T>{tr.review.sub}</T>
      </View>

      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
      />

      <View style={styles.wrap}>
        {draft.tags.map((t) => (
          <Chip key={t} label={`#${t}`} />
        ))}
      </View>

      <Section title={tr.review.typeTitle}>
        {types.map((key) => {
          const on = draft.interpretationType === key;
          const info = tr.review.types[key];
          const fg = on ? '#FFFFFF' : undefined;
          return (
            <Pressable
              key={key}
              onPress={() => update({ interpretationType: key })}
              style={[styles.option, { backgroundColor: on ? c.purple : c.card, borderColor: c.line, boxShadow: on ? `4px 4px 0 ${c.shadow}` : 'none' }]}>
              <View style={[styles.radio, { borderColor: c.line, backgroundColor: on ? c.lime : c.card }]} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="h2" color={fg}>
                  {info.label}
                </T>
                <T v="small" color={fg}>
                  {info.detail}
                </T>
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
  input: { minHeight: 150, borderRadius: radius.lg, padding: space.xl, fontFamily: fonts.regular, fontSize: 18, lineHeight: 27, textAlignVertical: 'top', borderWidth: border },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.lg, padding: space.xl, borderRadius: radius.lg, borderWidth: border },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: border },
});
