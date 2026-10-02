import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { formatDate } from '@/components/dream-card';
import { MangaPage } from '@/components/manga-page';
import { Art, Bar, Card, Chip, Icon, Loading, Screen, Section, Segmented, T, TopBar } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getDream, updateDream } from '@/services/api';
import type { Visibility } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { palette, space } from '@/theme/tokens';

export default function DreamDetail() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: dream, loading } = useAsync(() => getDream(id), id);
  const [fav, setFav] = useState<boolean | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);

  if (loading || !dream) return <Screen scroll={false}><Loading label="" /></Screen>;

  const a = dream.analysis;
  const mine = !dream.author;
  const isFav = fav ?? dream.favorite;
  const vis = visibility ?? dream.visibility;

  return (
    <Screen>
      <TopBar
        right={
          mine ? (
            <Pressable
              hitSlop={10}
              onPress={() => {
                setFav(!isFav);
                updateDream(dream.id, { favorite: !isFav });
              }}>
              <Icon name={isFav ? 'star' : 'star-outline'} color={isFav ? palette.orange : c.muted} size={24} />
            </Pressable>
          ) : undefined
        }
      />
      <View style={{ gap: space.sm }}>
        <T v="label">{dream.author ? `@${dream.author}` : formatDate(dream.createdAt)}</T>
        <T v="h1">{a.title}</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
          {a.tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </View>

      {dream.panels.length ? <MangaPage panels={dream.panels} /> : <Art colors={a.objects[0].art} height={180} />}

      <Card>
        <T color={c.text}>{a.cleanText}</T>
      </Card>

      <Section title="Yorum">
        <Card tone="lavender">
          <T color={palette.ink}>{a.interpretation}</T>
        </Card>
      </Section>

      <Section title={tr.analysis.emotions}>
        <Card style={{ gap: space.md }}>
          {a.emotions.map((e, i) => (
            <View key={e.label} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row' }}>
                <T v="h3" style={{ flex: 1 }}>
                  {e.label}
                </T>
                <T v="h3" color={c.muted}>
                  %{e.pct}
                </T>
              </View>
              <Bar pct={e.pct} color={[palette.purple, palette.pink, palette.lime][i % 3]} />
            </View>
          ))}
        </Card>
      </Section>

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
