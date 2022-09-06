import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  RecordSectionHeader,
  ListHeaderComponent,
} from '@/view/record-screen/components';
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

    const sections = Array.from(records).map(([title, data]) => ({
      title,
      data,
    }));
    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={({ item }) => {
            const Card = new ViewRecordVisitor(item).makeCard();
            return <Card style={styles.card} />;
          }}
          renderSectionHeader={({ section }) => (
            <RecordSectionHeader date={section.title} />
          )}
          keyExtractor={(item) => ViewRecordVisitor.makeKey(item)}
          ListHeaderComponent={ListHeaderComponent}
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
