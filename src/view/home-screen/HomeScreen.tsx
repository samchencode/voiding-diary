import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function factory() {
  return function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Hello from HomeScreen!</Text>
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
