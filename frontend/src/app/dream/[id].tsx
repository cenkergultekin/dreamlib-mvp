import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { formatDate } from '@/components/dream-card';
import { MangaPage } from '@/components/manga-page';
import { Art, Bar, Card, Chip, IconButton, Loading, Screen, Section, Segmented, T, TopBar } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getDream, updateDream } from '@/services/api';
import type { Visibility } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

export default function DreamDetail() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: dream } = useAsync(() => getDream(id), id);
  const [fav, setFav] = useState<boolean | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);

  if (!dream)
    return (
      <Screen scroll={false}>
        <Loading label="" />
      </Screen>
    );

  const a = dream.analysis;
  const mine = !dream.author;
  const isFav = fav ?? dream.favorite;
  const vis = visibility ?? dream.visibility;

  return (
    <Screen>
      <TopBar
        title={dream.author ? `@${dream.author}` : formatDate(dream.createdAt)}
        right={
          mine ? (
            <IconButton
              name={isFav ? 'star' : 'star-outline'}
              tone={isFav ? 'lime' : 'paper'}
              size={46}
              label="Favori"
              onPress={() => {
                setFav(!isFav);
                updateDream(dream.id, { favorite: !isFav });
              }}
            />
          ) : undefined
        }
      />
      <T v="hero">{a.title}</T>

      {dream.panels.length ? <MangaPage panels={dream.panels} /> : <Art colors={a.objects[0].art} height={200} />}

      <Card>
        <T color={c.text}>{a.cleanText}</T>
      </Card>

      <Section title={tr.dream.interpretation}>
        <Card tone="purple">
          <T color="#FFFFFF">{a.interpretation}</T>
        </Card>
      </Section>

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
              <Bar pct={e.pct} color={[c.purple, c.lavender, c.lime][i % 3]} />
            </View>
          ))}
        </Card>
      </Section>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {a.tags.map((t) => (
          <Chip key={t} label={`#${t}`} />
        ))}
      </View>

      {mine ? (
        <Segmented<Visibility>
          value={vis}
          onChange={(v) => {
            setVisibility(v);
            updateDream(dream.id, { visibility: v });
          }}
          options={[
            { key: 'private', label: tr.manga.visibility.private },
            { key: 'public', label: tr.manga.visibility.public },
          ]}
        />
      ) : null}
    </Screen>
  );
}
