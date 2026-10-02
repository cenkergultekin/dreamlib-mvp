import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art, Button, Chip, Screen, Section, T, ToggleRow, TopBar } from '@/components/ui';
import { features } from '@/config/features';
import { tr } from '@/i18n/tr';
import { art } from '@/services/mock-data';
import type { ArtStyle, PanelCount } from '@/services/types';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { border, palette, radius, space } from '@/theme/tokens';

const styleArt = { manga: ['#FFFDF7', '#121016', '#FFFDF7'], illustration: art.birds, collage: art.market, photographic: art.train } as const;
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
      <T v="h1">{tr.style.title}</T>

      <View style={styles.grid}>
        {styleKeys.map((k) => {
          const on = draft.style === k;
          return (
            <Pressable key={k} onPress={() => update({ style: k })} style={[styles.tile, { backgroundColor: on ? palette.lime : c.card, borderColor: c.line, boxShadow: on ? `4px 4px 0 ${c.shadow}` : 'none' }]}>
              <Art colors={styleArt[k]} height={90} />
              <T v="h3" color={on ? palette.ink : undefined}>{tr.style.styles[k]}</T>
              <T v="small" numberOfLines={1} color={on ? palette.ink : undefined}>
                {tr.style.details[k]}
              </T>
            </Pressable>
          );
        })}
      </View>

      <Section title={tr.style.panels}>
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          {counts.map((n) => (
            <Chip key={n} label={`${n} panel`} selected={draft.panelCount === n} onPress={() => update({ panelCount: n })} />
          ))}
        </View>
      </Section>

      {features.avatar ? <ToggleRow label={tr.style.avatar} value={draft.withAvatar} onChange={(v) => update({ withAvatar: v })} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: space.md },
  tile: { width: '47%', padding: space.sm, borderRadius: radius.lg, borderWidth: border, gap: 4 },
});
