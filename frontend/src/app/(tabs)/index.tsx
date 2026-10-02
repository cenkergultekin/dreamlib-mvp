import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { DreamCard } from '@/components/dream-card';
import { Lib } from '@/components/lib';
import { Art, Bar, Button, Card, Icon, Screen, Section, T } from '@/components/ui';
import { features } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile, listMatches, listMyDreams } from '@/services/api';
import { palette, space } from '@/theme/tokens';

const ink = palette.ink;

export default function Home() {
  const dreams = useAsync(listMyDreams);
  const profile = useAsync(getProfile);
  const matches = useAsync(listMatches);
  const { reload } = dreams;
  useFocusEffect(useCallback(() => reload(), [reload]));

  const last = dreams.data?.[0];
  const p = profile.data;
  const hour = new Date().getHours();

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: space.xl }}>
        <T v="label" style={{ flex: 1 }}>
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </T>
        <Pressable onPress={() => router.push('/library')} hitSlop={10}>
          <Icon name="library" size={24} />
        </Pressable>
      </View>

      <Card tone="lavender" style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.xl }}>
        <View style={{ flex: 1, gap: space.sm }}>
          <T v="hero" color={ink}>
            {tr.home.greeting(hour, p?.displayName ?? '')}
          </T>
          <T color={ink}>{last ? tr.home.libLine : tr.home.empty}</T>
        </View>
        <Lib mood={hour < 11 ? 'sleepy' : 'happy'} size={96} bounce />
      </Card>

      {p ? (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <Card tone="yellow" style={{ flex: 1 }}>
            <T v="h1" color={ink}>
              {p.streak}
            </T>
            <T v="label" color={ink}>
              {tr.home.streak}
            </T>
          </Card>
          <Card tone="lime" style={{ flex: 1.5 }}>
            <T v="h1" color={ink}>
              {p.weeklyGoal.done}/{p.weeklyGoal.total}
            </T>
            <Bar pct={(p.weeklyGoal.done / p.weeklyGoal.total) * 100} color={palette.purple} />
            <T v="label" color={ink}>
              {tr.home.goal}
            </T>
          </Card>
        </View>
      ) : null}

      <Button label={tr.home.tellCta} icon="mic" onPress={() => router.push('/tell')} />

      {features.bedtime ? (
        <Card tone="sky" onPress={() => router.push('/bedtime')} style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <Icon name="moon" size={28} color={ink} />
          <View style={{ flex: 1, gap: 2 }}>
            <T v="h3" color={ink}>
              {tr.home.bedtimeTitle}
            </T>
            <T v="small" color={ink}>
              {tr.home.bedtimeBody}
            </T>
          </View>
          <Icon name="arrow-forward" color={ink} />
        </Card>
      ) : null}

      {last ? (
        <Section title={tr.home.lastNight}>
          <DreamCard dream={last} large />
        </Section>
      ) : null}

      {features.matching && matches.data?.length ? (
        <Card tone="pink" onPress={() => router.push('/matches')} style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <View style={{ flexDirection: 'row' }}>
            {matches.data.slice(0, 3).map((m, i) => (
              <Art key={m.id} colors={m.avatar} style={{ width: 34, height: 34, borderRadius: 17, marginLeft: i ? -12 : 0 }} />
            ))}
          </View>
          <T v="h3" color={ink} style={{ flex: 1 }}>
            {tr.home.matchesTeaser(matches.data.length)}
          </T>
          <Icon name="arrow-forward" color={ink} />
        </Card>
      ) : null}

      {dreams.data && dreams.data.length > 1 ? (
        <Section title={tr.home.week} action={tr.home.library} onAction={() => router.push('/library')}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.md, paddingRight: 6, paddingBottom: 6 }}>
            {dreams.data.slice(1).map((d) => (
              <View key={d.id} style={{ width: 170 }}>
                <DreamCard dream={d} />
              </View>
            ))}
          </ScrollView>
        </Section>
      ) : null}
    </Screen>
  );
}
