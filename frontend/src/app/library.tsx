import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { DreamCard, formatDate } from '@/components/dream-card';
import { Art, Card, Chip, Screen, Section, Segmented, T, TopBar } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile, listMyDreams } from '@/services/api';
import type { Dream } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, radius, space } from '@/theme/tokens';

type Tab = keyof typeof tr.library.tabs;

export default function Library() {
  const [tab, setTab] = useState<Tab>('books');
  const dreams = useAsync(listMyDreams);
  const profile = useAsync(getProfile);
  const { reload } = dreams;
  useFocusEffect(useCallback(() => reload(), [reload]));
  const list = dreams.data ?? [];

  return (
    <Screen>
      <TopBar />
      <T v="hero">{tr.library.title}</T>
      <Segmented<Tab> value={tab} onChange={setTab} options={(Object.keys(tr.library.tabs) as Tab[]).map((k) => ({ key: k, label: tr.library.tabs[k] }))} />

      {tab === 'books' ? list.map((d) => <DreamCard key={d.id} dream={d} />) : null}
      {tab === 'texts' ? list.map((d) => <TextRow key={d.id} dream={d} />) : null}
      {tab === 'calendar' ? <Calendar dreams={list} /> : null}

      {profile.data ? (
        <Section title={tr.library.symbols}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
            {profile.data.symbols.map((s, i) => (
              <Chip key={s.label} label={`${s.label} · ${s.count}`} tone={i === 0 ? 'lime' : 'paper'} />
            ))}
          </View>
        </Section>
      ) : null}
    </Screen>
  );
}

function TextRow({ dream }: { dream: Dream }) {
  return (
    <Card onPress={() => router.push({ pathname: '/dream/[id]', params: { id: dream.id } })}>
      <T v="small">{formatDate(dream.createdAt)}</T>
      <T v="h2">{dream.analysis.title}</T>
      <T numberOfLines={3}>{dream.analysis.cleanText}</T>
    </Card>
  );
}

function Calendar({ dreams }: { dreams: Dream[] }) {
  const { c } = useTheme();
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // Monday first
  const byDay = new Map<number, Dream>();
  dreams.forEach((d) => {
    const dt = new Date(d.createdAt);
    if (dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear()) byDay.set(dt.getDate(), d);
  });

  return (
    <Card>
      <T v="h2">{now.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</T>
      <View style={styles.grid}>
        {tr.library.weekdays.map((w) => (
          <View key={w} style={styles.cell}>
            <T v="small" style={{ fontFamily: fonts.medium }}>
              {w}
            </T>
          </View>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <View key={`o${i}`} style={styles.cell} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const d = byDay.get(i + 1);
          const num = (
            <T v="small" color={d ? '#FFFFFF' : c.text} style={{ fontFamily: fonts.bold }}>
              {i + 1}
            </T>
          );
          return (
            <View key={i} style={styles.cell}>
              {d ? (
                <Pressable onPress={() => router.push({ pathname: '/dream/[id]', params: { id: d.id } })} style={styles.fill}>
                  <Art colors={['#7B5CFF', '#CFC3FF']} style={[styles.fill, styles.center, { borderRadius: radius.sm }]}>
                    {num}
                  </Art>
                </Pressable>
              ) : (
                <View style={[styles.fill, styles.center, { borderRadius: radius.sm, borderWidth: border - 1, borderColor: c.line, opacity: 0.35 }]}>{num}</View>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 3, alignItems: 'center', justifyContent: 'center' },
  fill: { width: '100%', height: '100%' },
  center: { alignItems: 'center', justifyContent: 'center' },
});
