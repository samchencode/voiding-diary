import React from 'react';
import { View, StyleSheet } from 'react-native';

type SplitColorBackgroundProps = {
  color1: string;
  color2: string;
  children: JSX.Element;
};

function SplitColorBackground({
  color1,
  color2,
  children,
}: SplitColorBackgroundProps) {
  return (
    <>
      <View style={styles.backgroundContainer}>
        <View style={[styles.colorBox, { backgroundColor: color1 }]} />
        <View style={[styles.colorBox, { backgroundColor: color2 }]} />
      </View>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: StyleSheet.absoluteFillObject,
  colorBox: {
    flex: 1,
  },
});

export { SplitColorBackground };
