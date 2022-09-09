import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { NoDataSvg } from '@/view/record-screen/svg/NoDataSvg';
import { theme } from '@/view/theme';

function ListEmptyComponent() {
  const { height } = useWindowDimensions();
  const svgHeight = Math.min(height / 4, 200);
  const svgWidth = svgHeight;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No records yet...</Text>
      <NoDataSvg
        height={svgHeight}
        width={svgWidth}
        themeColor={theme.colors.primary}
        style={styles.svg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...theme.fonts.md,
    textAlign: 'center',
  },
  svg: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
});

export { ListEmptyComponent };
