import React, { useState, useCallback } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { theme } from '@/view/theme';
import { Card } from '@/view/components';
import { d3 } from '@/vendor/d3';

const containerPadding = theme.spaces.lg;
const barHeight = 15;
const markerHeight = 40;
const barOffsetY = markerHeight - barHeight;
const svgHeight = markerHeight;
const goalTextOffsetX = 24;

type IntakeChartProps = {
  goal: number;
  intake: number;
  style?: StyleProp<ViewStyle>;
};

function IntakeChart({ goal, intake, style }: IntakeChartProps) {
  const data = { goal, intake };

  const [width, setWidth] = useState(0);
  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setWidth(nativeEvent.layout.width - containerPadding * 2);
  }, []);

  const scaleX = d3
    .scaleLinear()
    .domain([0, Math.max(data.goal, data.intake)])
    .range([0, width]);

  return (
    <Card onLayout={onLayout} style={[styles.card, style]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.intake}oz</Text>
        <Text style={styles.subtitle}>Intake</Text>
      </View>
      <Svg
        width={width}
        height={svgHeight}
        viewBox={`0 0 ${width} ${svgHeight}`}
      >
        <Rect
          x={0}
          y={barOffsetY}
          rx={barHeight / 2}
          width={width}
          height={barHeight}
          fill={theme.colors.bg}
        />
        <Rect
          x={0}
          y={barOffsetY}
          rx={barHeight / 2}
          width={scaleX(data.intake)}
          height={barHeight}
          fill={theme.colors.primary}
        />
        <Line
          x1={scaleX(data.goal)}
          x2={scaleX(data.goal)}
          y1={0}
          y2={svgHeight}
          stroke={theme.colors.danger}
          strokeWidth={2}
        />
        <SvgText
          x={scaleX(data.goal) - goalTextOffsetX}
          y={theme.spaces.lg}
          fontSize={16}
          fill={theme.colors.danger}
          textAnchor="end"
        >
          {data.goal}
        </SvgText>
        <SvgText
          x={scaleX(data.goal) - goalTextOffsetX + 18}
          y={theme.spaces.lg}
          fontSize={16}
          fill={theme.colors.danger}
          textAnchor="end"
        >
          oz
        </SvgText>
      </Svg>
    </Card>
  );
}

IntakeChart.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -12,
    marginBottom: -6,
  },
  title: {
    ...theme.fonts.lg,
  },
  subtitle: {
    ...theme.fonts.md,
    paddingBottom: 3,
  },
  card: {
    width: '100%',
    padding: containerPadding,
    display: 'flex',
  },
});

export { IntakeChart };
