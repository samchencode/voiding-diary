import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme';
import Svg, { G, Circle, Text, Path } from 'react-native-svg';
import d3 from '../../lib/d3';

function TimerView() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const height = Math.min(width, 400);

  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  };
  const offsetInnerCircle = 30;
  const widthInnerCircle = 5;
  const widthOuterCircle = 20;

  const radius =
    (height -
      Math.max(margin.left + margin.right, margin.top + margin.bottom)) /
    2;

  const tickLength = (2 * Math.PI * radius) / 80;

  const pie = d3.pie().sort(null);
  const arc = d3
    .arc()
    .innerRadius(radius - offsetInnerCircle - widthInnerCircle)
    .outerRadius(radius - offsetInnerCircle);

  const data = pie([0.2, 0.8]);

  return (
    <View
      style={{
        width: width * 2,
        height: width,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        transform: [
          { translateX: -width / 2 },
          { translateY: -(width - height) },
        ],
        shadowColor: colors.dark,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={height}
        height={height}
        viewBox={`0 0 ${height} ${height}`}
        style={{
          padding: 8,
        }}
      >
        <G x={margin.left} y={margin.top}>
          <Circle
            r={radius}
            cx={radius}
            cy={radius}
            stroke={colors.accent}
            strokeWidth={widthOuterCircle}
            strokeDasharray={[tickLength * 0.2, tickLength * 0.8]}
          />
          <G x={radius} y={radius}>
            <Path d={arc(data[0])} stroke={colors.accent} strokeWidth={10} />
            <Path d={arc(data[1])} stroke={colors.light} strokeWidth={10} />
          </G>
          <Text
            stroke={colors.light}
            fill={colors.light}
            x={radius}
            y={radius + 20}
            textAnchor="middle"
            fontSize={84}
            fontWeight="bold"
          >
            0:00
          </Text>
          <Text
            stroke={colors.light}
            fill={colors.light}
            x={radius}
            y={radius + 60}
            textAnchor="middle"
            fontSize={24}
            fontWeight={100}
          >
            Until Void
          </Text>
        </G>
      </Svg>
    </View>
  );
}

export default TimerView;
