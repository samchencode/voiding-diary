import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Animated, Easing } from 'react-native';
import { G, Text, Circle } from 'react-native-svg';
import { theme } from '@/view/theme';

const AnimatedText = Animated.createAnimatedComponent(Text);
const textOpacity = new Animated.Value(1);
const textAnimation = Animated.sequence([
  Animated.delay(1000),
  Animated.timing(textOpacity, {
    toValue: 0.2,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }),
  Animated.timing(textOpacity, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }),
]);

type VoidButtonProps = {
  radius: number;
  onPress: (e: GestureResponderEvent) => void;
};

function VoidButton({ radius, onPress }: VoidButtonProps) {
  Animated.loop(textAnimation).start();

  return (
    <G x={radius} y={radius}>
      <AnimatedText
        fill={theme.colors.light}
        textAnchor="middle"
        fontSize={56}
        fontWeight="bold"
        y={-10}
        opacity={textOpacity}
      >
        Log
      </AnimatedText>
      <AnimatedText
        fill={theme.colors.light}
        textAnchor="middle"
        fontSize={56}
        fontWeight="bold"
        y={50}
        opacity={textOpacity}
      >
        Void
      </AnimatedText>
      <Circle r={radius} onPress={onPress} />
    </G>
  );
}

export { VoidButton };
