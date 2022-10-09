import React from 'react';
import { DebugAction } from '@/view/test-screen/DebugAction';
import { StyleSheet, View, ScrollView, LogBox } from 'react-native';
import { StatusBar } from '@/view/status-bar';
import { theme } from '@/view/theme';
import { resetDatabase } from '@/view/test-screen/debug-actions/resetDatabase';

LogBox.ignoreLogs(['Require cycle']);

function factory() {
  return function App() {
    return (
      <View>
        <StatusBar color="transparent" statusBarStyle="dark" />
        <ScrollView style={styles.container}>
          <DebugAction title="alert" action={() => alert('test')} />
          <DebugAction title="Delete DB" action={resetDatabase} />
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spaces.lg,
    display: 'flex',
  },
});

export { factory };

export type Type = ReturnType<typeof factory>;
