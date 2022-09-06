import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type Type = ReturnType<typeof factory>;
