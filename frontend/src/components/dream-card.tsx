import { router } from 'expo-router';
import { View } from 'react-native';

import { Art, Card, Chip, T } from '@/components/ui';
import type { Dream } from '@/services/types';
import { space } from '@/theme/tokens';

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

export function DreamCard({ dream, large, height }: { dream: Dream; large?: boolean; height?: number }) {
  const cover = dream.panels[0]?.art ?? dream.analysis.objects[0].art;
  return (
    <Card onPress={() => router.push({ pathname: '/dream/[id]', params: { id: dream.id } })} style={{ padding: space.sm }}>
      <Art colors={cover} height={height ?? (large ? 190 : 140)} />
      <View style={{ paddingHorizontal: space.xs, paddingTop: 2, gap: 4 }}>
        <T v={large ? 'h2' : 'h3'} numberOfLines={2}>
          {dream.analysis.title}
        </T>
        {large ? (
          <T v="small" numberOfLines={2}>
            {dream.analysis.cleanText}
          </T>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.xs }}>
          <T v="label" numberOfLines={1} style={{ flex: 1 }}>
            {dream.author ? `@${dream.author}` : formatDate(dream.createdAt)}
          </T>
          {dream.likes !== undefined ? <Chip label={`♥ ${dream.likes}`} tone="pink" /> : dream.favorite ? <Chip label="★" tone="yellow" /> : null}
        </View>
      </View>
    </Card>
  );
}
