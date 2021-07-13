import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { useTheme, baseTheme } from '../theme';
import { Card } from '../common';
import d3 from '../../lib/d3';

function IntakeChart(props) {
  const data = {
    goal: 32,
    intake: 40,
  };

  const [width, setWidth] = useState(0);
  const containerPadding = spaces.lg;
  function onLayout({ nativeEvent }) {
    setWidth(nativeEvent.layout.width - containerPadding * 2);
  }
  const barHeight = 15;
  const markerHeight = 40;
  const barOffsetY = markerHeight - barHeight;
  const svgHeight = markerHeight;
  const goalTextOffsetX = 24;

  const scaleX = d3
    .scaleLinear()
    .domain([0, Math.max(data.goal, data.intake)])
    .range([0, width]);

  const { colors } = useTheme();

  return (
    <Card
      onLayout={onLayout}
      style={[
        {
          width: '100%',
          padding: containerPadding,
          display: 'flex',
        },
        props.style,
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>20oz</Text>
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
          fill={colors.bg}
        />
        <Rect
          x={0}
          y={barOffsetY}
          rx={barHeight / 2}
          width={scaleX(data.intake)}
          height={barHeight}
          fill={colors.accent}
        />
        <Line
          x1={scaleX(data.goal)}
          x2={scaleX(data.goal)}
          y1={0}
          y2={svgHeight}
          stroke={colors.danger}
          strokeWidth={2}
        />
        <SvgText
          x={scaleX(data.goal) - goalTextOffsetX}
          y={spaces.lg}
          fontSize={16}
          fill={colors.danger}
          textAnchor="end"
        >
          {data.goal}
        </SvgText>
        <SvgText
          x={scaleX(data.goal) - goalTextOffsetX + 18}
          y={spaces.lg}
          fontSize={16}
          fill={colors.danger}
          textAnchor="end"
        >
          oz
        </SvgText>
      </Svg>
    </Card>
  );
}

const { spaces } = baseTheme;

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -12,
    marginBottom: -6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Roboto_300Light',
    paddingBottom: 3,
  },
});

export default IntakeChart;
