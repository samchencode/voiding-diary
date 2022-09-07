import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/view/theme';
import { LoggerButtonGroup, Timer } from '@/view/home-screen/components';
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
        <View style={styles.cardContainer}>
          <LoggerButtonGroup
            style={styles.item}
            onPressIntake={() => alert('pressed intake')}
            onPressVoid={() => alert('pressed void')}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  cardContainer: {
    marginLeft: theme.spaces.lg,
    marginRight: theme.spaces.lg,
  },
  item: {
    marginTop: theme.spaces.lg,
  },
  lastItem: {
    marginBottom: theme.spaces.lg,
  },
});

export type Type = ReturnType<typeof factory>;
export { factory };
