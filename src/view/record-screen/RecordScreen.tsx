import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  RecordSectionHeader,
  ListHeader,
  ListEmpty,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { IntakeRecord, Record, VoidRecord } from '@/domain/models/Record';
import { RowRecordVisitor } from '@/view/components';
import type { AppNavigationProps } from '@/view/router';
import type { Observable } from '@/view/observables';

export function factory(
  getAllRecordsAction: GetAllRecordsAction,
  recordsStaleObservable: Observable
) {
  const getAndGroupRecords = async () =>
    getAllRecordsAction
      .execute()
      .then((res) => d3.group(res, (r) => r.getDateString()));

  return function RecordScreen({ navigation }: AppNavigationProps<'Record'>) {
    type Date = string;
    type RecordsByDate = InternMap<Date, Record[]>;
    const [records, setRecords] = useState<RecordsByDate>(new Map());

    const onEditVoidRecord = (voidRecord: VoidRecord) => {
      navigation.navigate('EditVoidRecordModal', { voidRecord });
    };
    const onEditIntakeRecord = (intakeRecord: IntakeRecord) => {
      navigation.navigate('EditIntakeRecordModal', { intakeRecord });
    };

    useEffect(() => {
      getAndGroupRecords().then((v) => setRecords(v));
      recordsStaleObservable.subscribe(() => {
        getAndGroupRecords().then((v) => setRecords(v));
      });
    }, []);

    const sections = Array.from(records).map(([title, data]) => ({
      title,
      data,
    }));

    const contentContainerStyle =
      sections.length === 0 ? styles.emptyListContainer : {};

    return (
      <View style={styles.container}>
        <SectionList
          style={styles.list}
          contentContainerStyle={contentContainerStyle}
          sections={sections}
          renderItem={({ item }) => {
            const visitor = new RowRecordVisitor(
              item,
              onEditIntakeRecord,
              onEditVoidRecord
            );
            return visitor.makeCard(styles.card);
          }}
          renderSectionHeader={({ section }) => (
            <RecordSectionHeader date={section.title} />
          )}
          keyExtractor={(record) => record.getId().getValue()}
          ListHeaderComponent={<ListHeader />}
          ListEmptyComponent={ListEmpty}
        />
      </View>
    );
  };
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  emptyListContainer: { flex: 1 },
  list: {
    paddingLeft: theme.spaces.lg,
    paddingRight: theme.spaces.lg,
  },
  card: {
    marginBottom: theme.spaces.sm,
  },
});

export type Type = ReturnType<typeof factory>;
