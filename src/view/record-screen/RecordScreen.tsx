import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import {
  RecordCard,
  RecordSectionHeader,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { Record } from '@/domain/models/Record';
import { ViewRecordVisitor } from '@/view/record-screen/ViewRecordVisitor';

export function factory(getAllRecordsAction: GetAllRecordsAction) {
  return function RecordScreen() {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
      getAllRecordsAction.execute().then((v) => setRecords(v));
    }, []);

    const byDate = d3.group(records, (r) => r.getDateString());
    const [firstByDate] = records.length > 0 ? byDate.values() : [[]];

    const cards = firstByDate
      .map((r) => new ViewRecordVisitor(r).getElementAndKey())
      .map(({ element, key }) => (
        <RecordCard recordRow={element} style={styles.card} key={key} />
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
