import { View } from 'react-native';

import { T } from '@/components/ui';
import { fonts, palette } from '@/theme/tokens';

/** Wordmark stays neutral while the mascot direction is being explored. */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <T v="h2" color={light ? palette.paper : undefined} style={{ fontFamily: fonts.heavy, letterSpacing: -1 }}>dreamlib</T>
    </View>
  );
}
