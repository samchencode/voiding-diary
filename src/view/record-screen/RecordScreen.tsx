import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import {
  IntakeRecordRow,
  VoidRecordRow,
  RecordCard,
  RecordSectionHeader,
  ViewRecordVisitor,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { Record } from '@/domain/models/Record';

export function factory(getAllRecordsAction: GetAllRecordsAction) {
  return function RecordScreen() {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
      getAllRecordsAction.execute().then((v) => setRecords(v));
    }, []);

    const visitor = new ViewRecordVisitor();
    records.forEach((r) => r.acceptVisitor(visitor));
    const cards = visitor
      .getRecordRows()
      .map(([r, k]) => (
        <RecordCard recordRow={r} style={styles.card} key={k} />
      ));

    return (
      <View style={styles.container}>
        <StatusBar statusBarStyle="dark" color="transparent" />
        <RecordSectionHeader date="Sept 9th 2022" />
        <RecordCard
          recordRow={<IntakeRecordRow volume="8oz" time="7:00 PM" />}
          style={styles.card}
        />
        <RecordCard
          recordRow={<VoidRecordRow volume="8oz" time="7:15 PM" />}
          style={styles.card}
        />
        {records.length > 0 && cards}
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
