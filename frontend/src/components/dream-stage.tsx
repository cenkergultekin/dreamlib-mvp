import { Image } from 'expo-image';
import { View } from 'react-native';

import type { LibMood } from '@/components/lib';
import { tr } from '@/i18n/tr';

/** Perest anchors the welcome and home screens. */
export function DreamStage({ size = 260 }: { mood?: LibMood; size?: number; bounce?: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Image
        source={require('../../assets/perest/perest-cutout.png')}
        accessibilityLabel={tr.common.perestReading}
        contentFit="contain"
        style={{ width: '100%', maxWidth: size, aspectRatio: 1 }}
      />
    </View>
  );
}
