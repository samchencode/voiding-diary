import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import { ParkSvg } from '@/view/record-screen/svg';

function ListHeaderComponent() {
  const { width } = useWindowDimensions();
  const svgWidth = Math.min(width, 400);
  const svgHeight = Math.min((svgWidth * 5) / 6, 300);

  return (
    <View style={styles.container}>
      <StatusBar statusBarStyle="dark" color="transparent" />
      <ParkSvg
        width={svgWidth}
        height={svgHeight}
        style={styles.svg}
        themeColor={theme.colors.primary}
      />
      <Text style={styles.title}>Records</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  svg: {
    marginBottom: -theme.spaces.lg,
    alignSelf: 'center',
  },
  title: {
    ...theme.fonts.lg,
    marginBottom: theme.spaces.sm,
    textAlign: 'right',
  },
});

export { ListHeaderComponent };
