import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import { ParkSvg } from '@/view/record-screen/svg';

type ListHeaderProps = {
  renderMenu: () => JSX.Element;
};

function ListHeader({ renderMenu }: ListHeaderProps) {
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
      <View style={[styles.menuContainer, { top: Constants.statusBarHeight }]}>
        {renderMenu()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
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

export { ListHeader };
