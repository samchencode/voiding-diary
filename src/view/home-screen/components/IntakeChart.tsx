import React, { useState, useCallback } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { theme } from '@/view/theme';
import { Card } from '@/view/components';
import { d3 } from '@/vendor/d3';
import type { Goal } from '@/domain/models/Goal';

const containerPadding = theme.spaces.lg;
const barHeight = 16;
const markerHeight = 40;
const barOffsetY = markerHeight - barHeight;
const svgHeight = markerHeight;
const goalTextOffsetX = 4;

type IntakeChartProps = {
  goal: Goal | null;
  intake: number | null;
  style?: StyleProp<ViewStyle>;
};

function IntakeChart({ goal, intake, style }: IntakeChartProps) {
  const goalValue = goal?.getTargetIntake().getValue() ?? 0;
  const intakeValue = intake ?? 0;

  const [width, setWidth] = useState(0);
  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setWidth(nativeEvent.layout.width - containerPadding * 2);
  }, []);

  const scaleX = d3
    .scaleLinear()
    .domain([0, Math.max(goalValue, intakeValue)])
    .range([0, width]);

  return (
    <Card onLayout={onLayout} style={[styles.card, style]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{intakeValue}oz</Text>
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
          width={scaleX(intakeValue)}
          height={barHeight}
          fill={theme.colors.primary}
        />
        {goal !== null && (
          <>
            <Line
              x1={scaleX(goalValue)}
              x2={scaleX(goalValue)}
              y1={0}
              y2={svgHeight}
              stroke={theme.colors.danger}
              strokeWidth={2}
            />
            <SvgText
              x={scaleX(goalValue) - goalTextOffsetX}
              y={theme.spaces.lg}
              fontSize={16}
              fill={theme.colors.danger}
              textAnchor="end"
            >
              {goal.getTargetIntake().toString()}
            </SvgText>
          </>
        )}
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
