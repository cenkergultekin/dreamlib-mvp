import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art, Button, Card, Chip, Screen, Section, T, ToggleRow, TopBar } from '@/components/ui';
import { features } from '@/config/features';
import { tr } from '@/i18n/tr';
import { art } from '@/services/mock-data';
import type { ArtStyle, PanelCount } from '@/services/types';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { border, radius, space } from '@/theme/tokens';

const styleArt = { manga: ['#FFFDF8', '#121016', '#FFFDF8'], illustration: art.birds, collage: art.market, photographic: art.train } as const;
const styleKeys: ArtStyle[] = ['manga', 'illustration', 'collage', 'photographic'];
const counts: PanelCount[] = [4, 6, 9];

export default function StyleScreen() {
  const { c } = useTheme();
  const { draft, update } = useDraft();

  return (
    <Screen
      footer={
        <>
          <Button label={tr.style.generate(draft.panelCount)} icon="sparkles" onPress={() => router.push('/flow/manga')} />
          <T v="small" style={{ textAlign: 'center' }}>
            {tr.style.quota}
          </T>
        </>
      }>
      <TopBar />
      <T v="hero">{tr.style.title}</T>

      <View style={styles.grid}>
        {styleKeys.map((k) => {
          const on = draft.style === k;
          return (
            <Pressable
              key={k}
              onPress={() => update({ style: k })}
              style={[styles.tile, { backgroundColor: on ? c.purple : c.card, borderColor: c.line, boxShadow: on ? `4px 4px 0 ${c.shadow}` : 'none' }]}>
              <Art colors={styleArt[k]} height={110} />
              <T v="h2" color={on ? '#FFFFFF' : undefined} style={{ textAlign: 'center' }}>
                {tr.style.styles[k]}
              </T>
            </Pressable>
          );
        })}
      </View>

      <Section title={tr.style.panels}>
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          {counts.map((n) => (
            <Chip key={n} label={`${n} kare`} selected={draft.panelCount === n} onPress={() => update({ panelCount: n })} />
          ))}
        </View>
      </Section>

      {features.avatar ? (
        <Card style={{ paddingVertical: space.md }}>
          <ToggleRow label={tr.style.avatar} value={draft.withAvatar} onChange={(v) => update({ withAvatar: v })} />
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: space.lg },
  tile: { width: '47%', padding: space.sm, paddingBottom: space.md, borderRadius: radius.lg, borderWidth: border, gap: space.sm },
});
