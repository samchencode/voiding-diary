import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/view/theme';
import { Timer } from '@/view/home-screen/components';
import { StatusBar } from '@/view/status-bar';

function factory() {
  return function HomeScreen() {
    const timeElapsed = 0;
    const timeRemaining = 0;

    return (
      <View style={styles.container}>
        <StatusBar
          color={theme.colors.primary}
          statusBarStyle="light"
          elevated
        />
        <Timer
          onPress={() => alert('pressed timer')}
          timeElapsedMs={timeElapsed}
          timeRemainingMs={timeRemaining}
        />
        <Text style={theme.fonts.lg}>Hello from HomeScreen!</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
});

export type Type = ReturnType<typeof factory>;
export { factory };
