import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Lib } from '@/components/lib';
import { Art, Bar, Button, Card, Chip, Screen, Section, T, ToggleRow, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { saveDream } from '@/services/api';
import { useDraft } from '@/state/draft';
import { palette, space } from '@/theme/tokens';

export default function AnalysisScreen() {
  const { draft, reset } = useDraft();
  const [personal, setPersonal] = useState(false);
  const [saving, setSaving] = useState(false);
  const a = draft.analysis;
  if (!a) return <Redirect href="/tell" />;

  const barColors = [palette.purple, palette.pink, palette.lime];

  const saveWithoutArt = async () => {
    setSaving(true);
    const dream = await saveDream({ rawText: draft.rawText, analysis: a, panels: [], style: draft.style, visibility: 'private' });
    reset();
    router.dismissAll();
    router.push({ pathname: '/dream/[id]', params: { id: dream.id } });
  };

  return (
    <Screen
      footer={
        <>
          <Button label={tr.analysis.visualize} icon="color-palette" onPress={() => router.push('/flow/style')} />
          <Button label={tr.analysis.saveOnly} variant="ghost" onPress={saveWithoutArt} loading={saving} />
        </>
      }>
      <TopBar />
      <View style={{ gap: space.sm }}>
        <Chip label={tr.review.types[draft.interpretationType].label} tone="yellow" />
        <T v="h1">{a.title}</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
          {a.tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </View>

      <Card tone="lavender" style={{ flexDirection: 'row', gap: space.md, alignItems: 'flex-start' }}>
        <Lib mood="happy" size={58} />
        <T color={palette.ink} style={{ flex: 1, fontSize: 16, lineHeight: 24 }}>
          {a.interpretation}
        </T>
      </Card>

      <Section title={tr.analysis.emotions}>
        <Card style={{ gap: space.md }}>
          {a.emotions.map((e, i) => (
            <View key={e.label} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row' }}>
                <T v="h3" style={{ flex: 1 }}>
                  {e.label}
                </T>
                <T v="h2">
                  %{e.pct}
                </T>
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
          <Card key={o.label} style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <Art colors={o.art} style={{ width: 52, height: 52 }} />
            <View style={{ flex: 1, gap: 2 }}>
              <T v="h3">{o.label}</T>
              <T v="small">{o.meaning}</T>
            </View>
          </Card>
        ))}
      </Section>
    </Screen>
  );
}
