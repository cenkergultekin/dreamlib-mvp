import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { DreamCard } from '@/components/dream-card';
import { Brand } from '@/components/brand';
import { DreamStage } from '@/components/dream-stage';
import { Art, Button, Card, Icon, IconButton, Screen, Section, T } from '@/components/ui';
import { features } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile, listMatches, listMyDreams } from '@/services/api';
import { useTheme } from '@/theme/theme';
import { palette, radius, space } from '@/theme/tokens';

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
          <Brand />
          <T v="small" style={{ marginTop: space.sm }}>{tr.home.hello} {p?.displayName ?? ''}</T>
        </View>
        <IconButton name="library" onPress={() => router.push('/library')} label={tr.library.title} />
      </View>

      <Card tone="lavender" style={{ padding: space.xxl, gap: space.lg }}>
          <T v="h1" color={palette.ink} style={{ maxWidth: 300, fontSize: 34, lineHeight: 40 }}>
            {heroTitle}
          </T>
          <DreamStage size={260} />
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
        <Card style={{ gap: space.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
            <T v="h3" style={{ flex: 1 }}>{tr.home.streak(p.streak)}</T>
          </View>
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            {Array.from({ length: p.weeklyGoal.total }, (_, i) => (
              <View key={i} style={{ flex: 1, height: 6, borderRadius: radius.pill, backgroundColor: i < p.weeklyGoal.done ? c.purple : c.bg }} />
            ))}
          </View>
          <T v="small">{tr.home.goal(p.weeklyGoal.done, p.weeklyGoal.total)}</T>
        </Card>
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
