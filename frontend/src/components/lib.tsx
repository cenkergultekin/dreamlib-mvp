import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Ellipse, Path, Text as SvgText } from 'react-native-svg';

import { palette } from '@/theme/tokens';

export type LibMood = 'happy' | 'sleepy' | 'thinking' | 'wow';

const ink = palette.ink;
const line = { stroke: ink, strokeWidth: 3.5, strokeLinecap: 'round' as const, fill: 'none' };

/** Lib, the dream mascot: a lavender blob in a night cap. Faces carry the state. */
export function Lib({ mood = 'happy', size = 96, bounce }: { mood?: LibMood; size?: number; bounce?: boolean }) {
  const [y] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!bounce) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -8, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bounce, y]);

  return (
    <Animated.View style={{ width: size, height: size, transform: [{ translateY: y }] }}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Ellipse cx={62} cy={112} rx={30} ry={5} fill={ink} opacity={0.15} />
        <Path d="M18 72 C16 38 38 20 62 20 C90 20 104 42 102 72 C101 96 88 106 60 106 C32 106 19 96 18 72 Z" fill={palette.lavender} stroke={ink} strokeWidth={3.5} />
        <Path d="M30 40 Q 58 12 92 30 L 108 8 Z" fill={palette.pink} stroke={ink} strokeWidth={3.5} strokeLinejoin="round" />
        <Circle cx={108} cy={8} r={6.5} fill={palette.lime} stroke={ink} strokeWidth={3} />
        <Circle cx={40} cy={76} r={6} fill={palette.pink} />
        <Circle cx={86} cy={76} r={6} fill={palette.pink} />
        <Face mood={mood} />
      </Svg>
    </Animated.View>
  );
}

function Face({ mood }: { mood: LibMood }) {
  switch (mood) {
    case 'sleepy':
      return (
        <>
          <Path d="M42 62 q7 5 14 0" {...line} />
          <Path d="M70 62 q7 5 14 0" {...line} />
          <Circle cx={63} cy={80} r={4} fill={ink} />
          <SvgText x={92} y={50} fontSize={16} fontWeight="900" fill={ink}>
            z
          </SvgText>
        </>
      );
    case 'thinking':
      return (
        <>
          <Circle cx={50} cy={60} r={6} fill="#fff" stroke={ink} strokeWidth={3} />
          <Circle cx={76} cy={60} r={6} fill="#fff" stroke={ink} strokeWidth={3} />
          <Circle cx={51} cy={57} r={2.6} fill={ink} />
          <Circle cx={77} cy={57} r={2.6} fill={ink} />
          <Path d="M56 83 h12 q4 0 6 -3" {...line} />
        </>
      );
    case 'wow':
      return (
        <>
          <Circle cx={49} cy={60} r={8} fill="#fff" stroke={ink} strokeWidth={3} />
          <Circle cx={77} cy={60} r={8} fill="#fff" stroke={ink} strokeWidth={3} />
          <Circle cx={49} cy={61} r={3.5} fill={ink} />
          <Circle cx={77} cy={61} r={3.5} fill={ink} />
          <Ellipse cx={63} cy={84} rx={6} ry={7} fill={ink} />
        </>
      );
    default:
      return (
        <>
          <Path d="M43 62 q6 -8 12 0" {...line} />
          <Path d="M71 62 q6 -8 12 0" {...line} />
          <Path d="M53 76 q10 11 20 0" {...line} />
        </>
      );
  }
}
