import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { DreamCard } from '@/components/dream-card';
import { Chip, Loading, Screen, T } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { listExplore } from '@/services/api';
import { space } from '@/theme/tokens';

const heights = [210, 160, 240, 180];

export default function Explore() {
  const [filter, setFilter] = useState(tr.explore.filters[0]);
  const all = filter === tr.explore.filters[0];
  const { data, loading } = useAsync(() => listExplore(all ? undefined : filter), filter);

  const cols = [0, 1].map((col) => (data ?? []).filter((_, i) => i % 2 === col));

  return (
    <Screen>
      <View style={{ gap: 6, paddingTop: space.xl }}>
        <T v="h1">{tr.explore.title}</T>
        <T>{tr.explore.sub}</T>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm }}>
        {tr.explore.filters.map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>
      {loading ? (
        <Loading label="" />
      ) : (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          {cols.map((items, col) => (
            <View key={col} style={{ flex: 1, gap: space.md }}>
              {items.map((d, i) => (
                <DreamCard key={d.id} dream={d} height={heights[(i * 2 + col) % heights.length] - 60} />
              ))}
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}
