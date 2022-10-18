import { theme } from '@/view/theme';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function factory() {
  return function AboutUsModal() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.message}>Andrew Goldmann, Sam Chen, John P</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  title: {
    ...theme.fonts.lg,
  },
  message: {
    ...theme.fonts.sm,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
