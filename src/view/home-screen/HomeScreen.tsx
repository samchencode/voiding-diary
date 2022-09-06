import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/view/theme';

function factory() {
  return function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text style={theme.fonts.lg}>Hello from HomeScreen!</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type Type = ReturnType<typeof factory>;
export { factory };
