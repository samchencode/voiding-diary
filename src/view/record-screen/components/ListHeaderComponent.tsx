import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import { ParkSvg } from '@/view/record-screen/ParkSvg';

function ListHeaderComponent() {
  const { width } = useWindowDimensions();
  const svgWidth = Math.min(width, 400);
  const svgHeight = (svgWidth * 2) / 3;

  return (
    <View>
      <StatusBar statusBarStyle="dark" color="transparent" />
      <ParkSvg width={svgWidth} height={svgHeight} style={styles.svg} />
      <Text style={styles.title}>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    marginBottom: -theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginBottom: theme.spaces.sm,
  },
});

export { ListHeaderComponent };
