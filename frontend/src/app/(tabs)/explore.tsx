import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { DreamCard } from '@/components/dream-card';
import { Chip, Loading, Screen, T } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { listExplore } from '@/services/api';
import { space } from '@/theme/tokens';

const heights = [170, 120, 200, 140];

export default function Explore() {
  const [filter, setFilter] = useState(tr.explore.filters[0]);
  const all = filter === tr.explore.filters[0];
  // Keep showing the previous list while a filter loads, so tapping a chip never blanks the screen.
  const { data } = useAsync(() => listExplore(all ? undefined : filter), filter);
  const cols = [0, 1].map((col) => (data ?? []).filter((_, i) => i % 2 === col));

  return (
    <Screen>
      <View style={{ gap: space.sm }}>
        <T v="hero">{tr.explore.title}</T>
        <T>{tr.explore.sub}</T>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingRight: 8 }}>
        {tr.explore.filters.map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>
      {!data ? (
        <Loading label="" />
      ) : (
        <View style={{ flexDirection: 'row', gap: space.lg }}>
          {cols.map((items, col) => (
            <View key={col} style={{ flex: 1, gap: space.lg }}>
              {items.map((d, i) => (
                <DreamCard key={d.id} dream={d} height={heights[(i * 2 + col) % heights.length]} />
              ))}
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}
