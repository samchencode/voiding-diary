import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  CellRenderer,
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
    const onDelete = (record: Record) => {
      const id = record.getId();
      navigation.navigate('ConfirmDeleteModal', { id });
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

    return (
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={[
            styles.listContainer,
            sections.length === 0 && styles.emptyListContainer,
          ]}
          sections={sections}
          renderItem={({ item }) => {
            const visitor = new RowRecordVisitor(item, {
              intakeRecord: {
                onPressEdit: onEditIntakeRecord,
                onPressDelete: onDelete,
              },
              voidRecord: {
                onPressEdit: onEditVoidRecord,
                onPressDelete: onDelete,
              },
            });
            return visitor.makeCard(styles.card);
          }}
          renderSectionHeader={({ section }) => (
            <RecordSectionHeader
              date={section.title}
              style={styles.sectionHeader}
            />
          )}
          keyExtractor={(record) => record.getId().getValue()}
          ListHeaderComponent={<ListHeader />}
          ListEmptyComponent={ListEmpty}
          CellRendererComponent={CellRenderer}
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
  listContainer: {
    minHeight: '100%',
  },
  sectionHeader: {
    marginLeft: theme.spaces.lg,
    marginRight: theme.spaces.lg,
  },
  card: {
    marginBottom: theme.spaces.sm,
    marginLeft: theme.spaces.lg,
    marginRight: theme.spaces.lg,
  },
});

export type Type = ReturnType<typeof factory>;
