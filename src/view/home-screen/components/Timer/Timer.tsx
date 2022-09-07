/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { theme } from '@/view/theme';
import { d3 } from '@/vendor/d3';
import { CountDownText } from '@/view/home-screen/components/Timer/CountdownText';
import { VoidButton } from '@/view/home-screen/components/Timer/VoidButton';

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
};

const horizontalMargins = margin.left + margin.right;
const verticalMargins = margin.top + margin.bottom;
const maxHeight = 400;

const offsetInnerCircle = 30;
const widthInnerCircle = 5;
const widthOuterCircle = 20;

function getRadius(height: number) {
  return (height - Math.max(horizontalMargins, verticalMargins)) / 2;
}

type BaseTimerProps = {
  children: JSX.Element[];
};

function BaseTimer({ children }: BaseTimerProps) {
  const { width } = useWindowDimensions();
  const height = Math.min(width, maxHeight);

  const containerStyle = {
    width: width * 2,
    height: width,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    transform: [{ translateX: -width / 2 }, { translateY: -(width - height) }],
  };

  const radius = getRadius(height);

  const tickArcLength = (2 * Math.PI * radius) / 80;

  return (
    <View style={[styles.container, containerStyle]}>
      <Svg width={height} height={height} viewBox={`0 0 ${height} ${height}`}>
        <G x={margin.left} y={margin.top}>
          <Circle
            r={radius}
            cx={radius}
            cy={radius}
            stroke={theme.colors.accent}
            strokeWidth={widthOuterCircle}
            strokeDasharray={[tickArcLength * 0.2, tickArcLength * 0.8]}
          />
          {children}
        </G>
      </Svg>
    </View>
  );
}

type TickingTimerProps = {
  timeElapsedMs: number;
  timeRemainingMs: number;
};

function TickingTimer({ timeElapsedMs, timeRemainingMs }: TickingTimerProps) {
  const { width } = useWindowDimensions();
  const height = Math.min(width, maxHeight);

  const radius = getRadius(height);

  const pie = d3.pie().sort(null);
  const arc = d3
    .arc()
    .innerRadius(radius - offsetInnerCircle - widthInnerCircle)
    .outerRadius(radius - offsetInnerCircle);

  const data = pie([timeElapsedMs, timeRemainingMs]);

  return (
    <BaseTimer>
      <G x={radius} y={radius}>
        <Path
          // @ts-ignore
          d={arc(data[1])}
          stroke={theme.colors.accent}
          strokeWidth={10}
        />
        <Path
          // @ts-ignore
          d={arc(data[0])}
          stroke={theme.colors.light}
          strokeWidth={10}
        />
      </G>
      <CountDownText radius={radius} timeString="12:05" />
    </BaseTimer>
  );
}

type StoppedTimerProps = {
  onPress: (e: GestureResponderEvent) => void;
};

function StoppedTimer({ onPress }: StoppedTimerProps) {
  const { width } = useWindowDimensions();
  const height = Math.min(width, maxHeight);

  const radius = getRadius(height);

  const arc = d3
    .arc()
    .innerRadius(radius - offsetInnerCircle - widthInnerCircle)
    .outerRadius(radius - offsetInnerCircle)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  return (
    <BaseTimer>
      <G x={radius} y={radius}>
        <Path
          // @ts-ignore
          d={arc()}
          stroke={theme.colors.light}
          strokeWidth={10}
        />
      </G>
      <VoidButton radius={radius} onPress={onPress} />
    </BaseTimer>
  );
}

type TimerProps = TickingTimerProps & StoppedTimerProps;

function Timer({ timeElapsedMs, timeRemainingMs, onPress }: TimerProps) {
  const ticking = timeRemainingMs > 0;
  if (!ticking) return <StoppedTimer onPress={onPress} />;
  return (
    <TickingTimer
      timeElapsedMs={timeElapsedMs}
      timeRemainingMs={timeRemainingMs}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // For iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 5,
    // For Android shadow
    elevation: 1,
  },
});

export { Timer };
