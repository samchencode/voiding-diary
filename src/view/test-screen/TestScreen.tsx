import React from 'react';
import { DebugAction } from '@/view/test-screen/DebugAction';
import { StyleSheet, View, ScrollView, LogBox } from 'react-native';
import { StatusBar } from '@/view/status-bar';
import { theme } from '@/view/theme';
import { resetDatabase } from '@/view/test-screen/debug-actions/resetDatabase';
import { launchNotification } from '@/view/test-screen/debug-actions/launchNotification';
import type { Injector } from 'didi';

LogBox.ignoreLogs(['Require cycle']);

function factory(injector: Injector) {
  // injector is automatically provided by didi
  return function App() {
    return (
      <View>
        <StatusBar color="transparent" statusBarStyle="dark" />
        <ScrollView style={styles.container}>
          <DebugAction
            title="alert"
            action={() => alert('test')}
            container={injector}
          />
          <DebugAction
            title="Delete DB"
            action={resetDatabase}
            container={injector}
          />
          <DebugAction
            title="Launch Notification"
            action={launchNotification}
            container={injector}
          />
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
