import { router } from 'expo-router';
import { View } from 'react-native';

import { Art, Card, Chip, Icon, Loading, Screen, T } from '@/components/ui';
import { features } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { listMatches } from '@/services/api';
import { useTheme } from '@/theme/theme';
import { palette, space } from '@/theme/tokens';

export default function Matches() {
  const { c } = useTheme();
  const { data, loading } = useAsync(listMatches);

  return (
    <Screen>
      <View style={{ gap: 6, paddingTop: space.xl }}>
        <T v="hero">{tr.matches.title}</T>
        <T>{tr.matches.sub}</T>
      </View>
      {loading || !data ? (
        <Loading label="" />
      ) : (
        data.map((m) => (
          <Card
            key={m.id}
            onPress={features.messages ? () => router.push({ pathname: '/match/[id]', params: { id: m.id } }) : undefined}
            style={{ gap: space.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
              <Art colors={m.avatar} style={{ width: 48, height: 48, borderRadius: 24 }} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="h3">@{m.username}</T>
                <T v="small" numberOfLines={1}>
                  {m.dreamTitle}
                </T>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <T v="h1" color={palette.purple}>
                  %{m.similarity}
                </T>
                <T v="label">{tr.matches.similarity}</T>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
              <T v="label">{tr.matches.shared}</T>
              {m.sharedSymbols.map((s) => (
                <Chip key={s} label={s} tone="lime" />
              ))}
              <View style={{ flex: 1 }} />
              {features.messages ? <Icon name="chatbubble-ellipses-outline" color={c.muted} /> : null}
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}
