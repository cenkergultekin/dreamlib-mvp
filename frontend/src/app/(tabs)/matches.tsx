import { router } from 'expo-router';
import { View } from 'react-native';

import { Art, Card, Chip, Icon, Loading, Screen, T } from '@/components/ui';
import { features } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { listMatches } from '@/services/api';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

export default function Matches() {
  const { c } = useTheme();
  const { data } = useAsync(listMatches);

  return (
    <Screen>
      <View style={{ gap: space.sm }}>
        <T v="hero">{tr.matches.title}</T>
        <T>{tr.matches.sub}</T>
      </View>
      {!data ? (
        <Loading label="" />
      ) : (
        data.map((m, i) => (
          <Card
            key={m.id}
            tone={i === 0 ? 'purple' : 'paper'}
            onPress={features.messages ? () => router.push({ pathname: '/match/[id]', params: { id: m.id } }) : undefined}
            style={{ gap: space.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
              <Art colors={m.avatar} style={{ width: 60, height: 60, borderRadius: 30 }} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="h2" color={i === 0 ? '#FFFFFF' : undefined}>
                  @{m.username}
                </T>
                <T v="small" color={i === 0 ? '#FFFFFF' : undefined} numberOfLines={1}>
                  {m.dreamTitle}
                </T>
              </View>
              {features.messages ? <Icon name="chatbubble-ellipses" size={26} color={i === 0 ? '#FFFFFF' : c.text} /> : null}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, flexWrap: 'wrap' }}>
              <Chip label={tr.matches.similar(m.similarity)} tone="lime" />
              {m.sharedSymbols.map((s) => (
                <Chip key={s} label={`#${s}`} />
              ))}
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}
