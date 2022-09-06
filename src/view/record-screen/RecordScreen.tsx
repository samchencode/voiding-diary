import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/view/theme';

export function factory() {
  return function RecordScreen() {
    return (
      <View style={styles.container}>
        <Text>Hello from RecordScreen!</Text>
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
