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
      <TopBar title={title} />
      <View style={{ alignItems: 'center', gap: space.md, paddingTop: 80 }}>
        <Lib mood="thinking" size={110} />
        <T v="h2">{tr.common.soon}</T>
        <T>{tr.soonBody}</T>
      </View>
    </Screen>
  );
}
