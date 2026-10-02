import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Lib } from '@/components/lib';
import { Screen, T, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { space } from '@/theme/tokens';

// Stand-in for features whose screens are not designed yet (avatar, knowledge, settings).
export default function Soon() {
  const { title } = useLocalSearchParams<{ title?: string }>();
  return (
    <Screen>
      <TopBar />
      <View style={{ alignItems: 'center', gap: space.lg, paddingTop: space.xxl * 2 }}>
        <Lib mood="thinking" size={160} bounce />
        <T v="hero" style={{ textAlign: 'center' }}>
          {title ?? tr.common.soon}
        </T>
        <T style={{ textAlign: 'center' }}>{tr.soonBody}</T>
      </View>
    </Screen>
  );
}
