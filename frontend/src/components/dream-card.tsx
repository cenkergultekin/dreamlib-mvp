import { router } from 'expo-router';
import { View } from 'react-native';

import { Art, Card, Icon, T } from '@/components/ui';
import type { Dream } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export function DreamCard({ dream, large, height }: { dream: Dream; large?: boolean; height?: number }) {
  const { c } = useTheme();
  const cover = dream.panels[0]?.art ?? dream.analysis.objects[0].art;
  return (
    <Card onPress={() => router.push({ pathname: '/dream/[id]', params: { id: dream.id } })} style={{ padding: space.md, gap: space.lg, flexDirection: large ? 'row' : 'column', alignItems: large ? 'center' : undefined }}>
      <Art colors={cover} height={height ?? (large ? 112 : 140)} style={large ? { width: 112 } : undefined} />
      <View style={{ gap: space.sm, paddingHorizontal: space.xs, flex: large ? 1 : undefined }}>
        <T v={large ? 'h3' : 'h2'} numberOfLines={2}>
          {dream.analysis.title}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
          <T v="small" numberOfLines={1} style={{ flex: 1 }}>
            {dream.author ? `@${dream.author}` : formatDate(dream.createdAt)}
          </T>
          {dream.likes !== undefined ? (
            <>
              <Icon name="heart" size={18} color={c.purple} />
              <T v="small" color={c.text}>
                {dream.likes}
              </T>
            </>
          ) : dream.favorite ? (
            <Icon name="star" size={18} color={c.purple} />
          ) : null}
        </View>
      </View>
    </Card>
  );
}
