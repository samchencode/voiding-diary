import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TargetSvg } from '@/view/goal-screen/TargetSvg';

export function factory() {
  return function GoalScreen() {
    const svgHeight = 400;
    const svgWidth = (svgHeight * 2) / 3;

    return (
      <View style={styles.container}>
        <TargetSvg height={svgHeight} width={svgWidth} />
        <Text>Hello from GoalScreen!</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type Type = ReturnType<typeof factory>;
