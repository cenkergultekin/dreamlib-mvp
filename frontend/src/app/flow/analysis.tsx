import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Lib } from '@/components/lib';
import { Art, Bar, Button, Card, Chip, Screen, Section, T, ToggleRow, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { saveDream } from '@/services/api';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

export default function AnalysisScreen() {
  const { c } = useTheme();
  const { draft, reset } = useDraft();
  const [personal, setPersonal] = useState(false);
  const [saving, setSaving] = useState(false);
  const a = draft.analysis;
  if (!a) return <Redirect href="/tell" />;

  const barColors = [c.purple, c.lavender, c.lime];

  const saveWithoutArt = async () => {
    if (saving) return;
    setSaving(true);
    const dream = await saveDream({ rawText: draft.rawText, analysis: a, panels: [], style: draft.style, visibility: 'private' });
    reset();
    router.dismissTo('/');
    router.push({ pathname: '/dream/[id]', params: { id: dream.id } });
  };

  return (
    <Screen
      footer={
        <>
          <Button label={tr.analysis.visualize} icon="color-palette" onPress={() => router.push('/flow/style')} />
          <Button label={tr.analysis.saveOnly} variant="ghost" onPress={saveWithoutArt} disabled={saving} />
        </>
      }>
      <TopBar title={tr.review.types[draft.interpretationType].label} />
      <T v="hero">{a.title}</T>

      <Card tone="purple" style={{ gap: space.lg }}>
        <Lib mood="happy" size={72} />
        <T color="#FFFFFF" style={{ fontSize: 18, lineHeight: 27 }}>
          {a.interpretation}
        </T>
      </Card>

      <Section title={tr.analysis.emotions}>
        <Card style={{ gap: space.lg }}>
          {a.emotions.map((e, i) => (
            <View key={e.label} style={{ gap: space.sm }}>
              <View style={{ flexDirection: 'row' }}>
                <T v="h3" style={{ flex: 1 }}>
                  {e.label}
                </T>
                <T v="h3">%{e.pct}</T>
              </View>
              <Bar pct={e.pct} color={barColors[i % 3]} />
              {personal ? <T v="small">{e.note}</T> : null}
            </View>
          ))}
          <ToggleRow label={tr.analysis.personal} value={personal} onChange={setPersonal} />
        </Card>
      </Section>

      <Section title={tr.analysis.objects}>
        {a.objects.map((o) => (
          <Card key={o.label} style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
            <Art colors={o.art} style={{ width: 64, height: 64 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <T v="h2">{o.label}</T>
              <T v="small">{o.meaning}</T>
            </View>
          </Card>
        ))}
      </Section>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {a.tags.map((t) => (
          <Chip key={t} label={`#${t}`} />
        ))}
      </View>
    </Screen>
  );
}
