import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import {
  IntakeRecordRow,
  VoidRecordRow,
  RecordCard,
  RecordSectionHeader,
} from '@/view/record-screen/components';

export function factory() {
  return function RecordScreen() {
    return (
      <View style={styles.container}>
        <StatusBar statusBarStyle="dark" color="transparent" />
        <RecordSectionHeader date="Sept 9th 2022" />
        <RecordCard
          recordRow={
            <IntakeRecordRow label="Example" volume="8oz" time="7:00 PM" />
          }
          style={styles.card}
        />
        <RecordCard
          recordRow={
            <VoidRecordRow label="Example" volume="8oz" time="7:15 PM" />
          }
          style={styles.card}
        />
      </View>
    );
  };
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingLeft: theme.spaces.lg,
    paddingRight: theme.spaces.lg,
  },
  card: {
    marginBottom: theme.spaces.sm,
  },
});

export type Type = ReturnType<typeof factory>;
