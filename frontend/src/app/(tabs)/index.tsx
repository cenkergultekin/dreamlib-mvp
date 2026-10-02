import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { DreamCard } from '@/components/dream-card';
import { Lib } from '@/components/lib';
import { Art, Button, Card, Icon, IconButton, Screen, Section, T } from '@/components/ui';
import { features } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile, listMatches, listMyDreams } from '@/services/api';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

export default function Home() {
  const { c } = useTheme();
  const dreams = useAsync(listMyDreams);
  const profile = useAsync(getProfile);
  const matches = useAsync(listMatches);
  const { reload } = dreams;
  useFocusEffect(useCallback(() => reload(), [reload]));

  const last = dreams.data?.[0];
  const p = profile.data;
  const hour = new Date().getHours();
  const night = hour >= 21 || hour < 4;
  const heroTitle = night ? tr.home.heroNight : hour < 12 ? tr.home.heroMorning : tr.home.heroDay;

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <T>{tr.home.hello}</T>
          <T v="h1">{p?.displayName ?? ''}</T>
        </View>
        <IconButton name="library" onPress={() => router.push('/library')} label={tr.library.title} />
      </View>

      <Card tone="purple" style={{ padding: space.xxl, gap: space.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <T v="h1" color="#FFFFFF" style={{ flex: 1 }}>
            {heroTitle}
          </T>
          <Lib mood={night ? 'sleepy' : 'happy'} size={104} bounce />
        </View>
        {night && features.bedtime ? (
          <>
            <Button label={tr.home.bedtimeCta} icon="moon" onPress={() => router.push('/bedtime')} />
            <Button label={tr.home.tellCta} variant="secondary" icon="mic" onPress={() => router.push('/tell')} />
          </>
        ) : (
          <Button label={tr.home.tellCta} icon="mic" onPress={() => router.push('/tell')} />
        )}
      </Card>

      {p ? (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <Card style={{ flex: 1 }}>
            <Icon name="flame" size={28} color={c.purple} />
            <T v="h3">{tr.home.streak(p.streak)}</T>
          </Card>
          <Card style={{ flex: 1 }}>
            <Icon name="calendar" size={28} color={c.purple} />
            <T v="h3">{tr.home.goal(p.weeklyGoal.done, p.weeklyGoal.total)}</T>
          </Card>
        </View>
      ) : null}

      {last ? (
        <Section title={tr.home.lastNight} action={tr.home.seeAll} onAction={() => router.push('/library')}>
          <DreamCard dream={last} large />
        </Section>
      ) : (
        <Card>
          <T>{tr.home.empty}</T>
        </Card>
      )}

      {features.matching && matches.data?.length ? (
        <Card onPress={() => router.push('/matches')} style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <View style={{ flexDirection: 'row' }}>
            {matches.data.slice(0, 3).map((m, i) => (
              <Art key={m.id} colors={m.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: i ? -14 : 0 }} />
            ))}
          </View>
          <T v="h3" style={{ flex: 1 }}>
            {tr.home.matchesTeaser(matches.data.length)}
          </T>
          <Icon name="arrow-forward" />
        </Card>
      ) : null}

      {dreams.data && dreams.data.length > 1 ? (
        <Section title={tr.home.week}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.lg, paddingRight: 8, paddingBottom: 8 }}>
            {dreams.data.slice(1).map((d) => (
              <View key={d.id} style={{ width: 200 }}>
                <DreamCard dream={d} />
              </View>
            ))}
          </ScrollView>
        </Section>
      ) : null}
    </Screen>
  );
}
