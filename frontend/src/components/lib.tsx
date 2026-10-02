import { Image } from 'expo-image';
import { ActivityIndicator } from 'react-native';
import { palette } from '@/theme/tokens';
import { tr } from '@/i18n/tr';

export type LibMood = 'happy' | 'sleepy' | 'thinking' | 'wow';

/** Existing stateful screens share Perest's approved cutout. */
export function Lib({ size = 96 }: { mood?: LibMood; size?: number; bounce?: boolean }) {
  if (size < 48) return <ActivityIndicator size="small" color={palette.purple} />;
  return <Image source={require('../../assets/perest/perest-cutout.png')} accessibilityLabel={tr.common.perest} contentFit="contain" style={{ width: size, height: size }} />;
}
