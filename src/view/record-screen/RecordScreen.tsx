import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import {
  RecordCard,
  RecordSectionHeader,
  ViewRecordVisitor,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { Record } from '@/domain/models/Record';
import { d3 } from '@/vendor/d3';

export function factory(getAllRecordsAction: GetAllRecordsAction) {
  return function RecordScreen() {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
      getAllRecordsAction.execute().then((v) => setRecords(v));
    }, []);

    const byDate = d3.group(records, (r) => r.getDateString());
    const [firstByDate] = records.length > 0 ? byDate.values() : [[]];

    const visitor = new ViewRecordVisitor();
    firstByDate.forEach((r) => r.acceptVisitor(visitor));
    const cards = visitor
      .getRecordRows()
      .map(([r, k]) => (
        <RecordCard recordRow={r} style={styles.card} key={k} />
      ));

    return (
      <View style={styles.container}>
        <StatusBar statusBarStyle="dark" color="transparent" />
        <RecordSectionHeader
          date={records.length > 0 ? byDate.keys().next().value : 'Waiting...'}
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
