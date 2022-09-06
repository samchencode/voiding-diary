import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import { RecordSectionHeader } from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { Record } from '@/domain/models/Record';
import { ViewRecordVisitor } from '@/view/record-screen/ViewRecordVisitor';

export function factory(getAllRecordsAction: GetAllRecordsAction) {
  return function RecordScreen() {
    type Date = string;
    type RecordsByDate = InternMap<Date, Record[]>;
    const [records, setRecords] = useState<RecordsByDate>(new Map());

    useEffect(() => {
      getAllRecordsAction
        .execute()
        .then((res) => d3.group(res, (r) => r.getDateString()))
        .then((v) => setRecords(v));
    }, []);

    const makeCardsForSection = (recordsForSection: Record[]) =>
      recordsForSection
        .map((r) => new ViewRecordVisitor(r).makeCardAndKey())
        .map(([Card, key]) => <Card style={styles.card} key={key} />);

    const cards = Array.from(records.values()).flatMap(makeCardsForSection);

    return (
      <View style={styles.container}>
        <StatusBar statusBarStyle="dark" color="transparent" />
        <RecordSectionHeader date="Placeholder" />
        {records.size > 0 && cards}
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
