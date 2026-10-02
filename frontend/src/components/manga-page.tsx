import { StyleSheet, Text, View } from 'react-native';

import { Art } from '@/components/ui';
import type { MangaPanel } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette } from '@/theme/tokens';

// Column spans out of 6, per panel count (from the prototype layout).
const spans: Record<number, number[]> = {
  4: [6, 3, 3, 6],
  6: [6, 3, 3, 2, 2, 2],
  9: [4, 2, 2, 2, 2, 3, 3, 2, 4],
};

export function MangaPage({ panels, withAvatar }: { panels: MangaPanel[]; withAvatar?: boolean }) {
  const { c } = useTheme();
  const layout = spans[panels.length] ?? panels.map(() => 3);
  return (
    <View style={[styles.page, { backgroundColor: palette.paper, borderColor: c.line, boxShadow: `5px 5px 0 ${c.shadow}` }]}>
      {panels.map((p, i) => {
        const span = layout[i] ?? 3;
        return (
          <View key={i} style={{ width: `${(span / 6) * 100}%`, padding: 3 }}>
            <Art colors={p.art} height={span >= 4 ? 150 : 115} style={styles.panel}>
              {withAvatar && i === 0 ? (
                <View style={[styles.me, { backgroundColor: palette.lime }]}>
                  <Text style={[styles.meText, { color: palette.ink }]}>BEN</Text>
                </View>
              ) : null}
              <View style={styles.caption}>
                <Text style={styles.captionText} numberOfLines={2}>
                  {p.caption}
                </Text>
              </View>
            </Art>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flexDirection: 'row', flexWrap: 'wrap', padding: 5, borderRadius: 14, borderWidth: border },
  panel: { borderRadius: 4, borderWidth: 2, borderColor: '#121016', justifyContent: 'flex-end' },
  caption: { margin: 6, alignSelf: 'flex-start', backgroundColor: palette.paper, borderWidth: 1.5, borderColor: '#121016', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 3 },
  captionText: { fontFamily: fonts.bold, fontSize: 11, color: '#121016' },
  me: { position: 'absolute', top: 6, right: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, borderWidth: 1.5, borderColor: palette.ink },
  meText: { fontFamily: fonts.heavy, fontSize: 9 },
});
