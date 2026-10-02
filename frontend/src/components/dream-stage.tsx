import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Lib, type LibMood } from '@/components/lib';
import { palette } from '@/theme/tokens';

/** Quiet orbit and ink sparkles frame the mascot without adding product copy. */
export function DreamStage({ mood = 'happy', size = 230, bounce = true }: { mood?: LibMood; size?: number; bounce?: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: size + 12, width: '100%' }}>
      <Svg width="100%" height="100%" viewBox="0 0 320 250" style={{ position: 'absolute' }}>
        <Circle cx={160} cy={125} r={103} fill="none" stroke={palette.paper} strokeWidth={1} opacity={0.3} />
        <Path d="M37 70 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5Z M278 157 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" fill={palette.cream} stroke={palette.ink} strokeWidth={2} />
        <Circle cx={265} cy={55} r={5} fill={palette.lime} stroke={palette.ink} strokeWidth={2} />
        <Circle cx={61} cy={196} r={3} fill={palette.cream} />
      </Svg>
      <Lib mood={mood} size={size} bounce={bounce} />
    </View>
  );
}
