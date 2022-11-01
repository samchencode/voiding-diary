import React, { useCallback, useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, View, SectionList } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  CellRenderer,
  RecordSectionHeader,
  ListHeader,
  ListEmpty,
  IntakeRecordRow,
  VoidRecordRow,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { IntakeRecord, Record, VoidRecord } from '@/domain/models/Record';
import { RowRecordVisitor } from '@/view/components';
import type { AppNavigationProps } from '@/view/router';
import type { Observable } from '@/view/observables';
import { Card } from '@/view/components/Card';

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

    const onEditVoidRecord = React.useCallback(
      (voidRecord: VoidRecord) => {
        navigation.navigate('EditVoidRecordModal', { voidRecord });
      },
      [navigation]
    );
    const onEditIntakeRecord = React.useCallback(
      (intakeRecord: IntakeRecord) => {
        navigation.navigate('EditIntakeRecordModal', { intakeRecord });
      },
      [navigation]
    );
    const onDelete = React.useCallback(
      (record: Record) => {
        navigation.navigate('ConfirmDeleteModal', { id: record.getId() });
      },
      [navigation]
    );
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

    const [screenHeight, setScreenHeight] = useState<number>(0);
    const onLayout = useCallback((e: LayoutChangeEvent) => {
      setScreenHeight(e.nativeEvent.layout.height);
    }, []);

    return (
      <View style={styles.container} onLayout={onLayout}>
        <SectionList
          contentContainerStyle={[
            styles.listContainer,
            sections.length === 0 && styles.emptyListContainer,
          ]}
          sections={sections}
          renderItem={({ item }) =>
            new RowRecordVisitor(item, {
              makeIntakeRecordRow: (r) => (
                <Card key={r.getId().getValue()} style={styles.card}>
                  <IntakeRecordRow
                    intakeRecord={r}
                    onEdit={onEditIntakeRecord}
                    onDelete={onDelete}
                    id={r.getId().getValue()}
                    screenHeight={screenHeight}
                  />
                </Card>
              ),
              makeVoidRecordRow: (r) => (
                <Card key={r.getId().getValue()} style={styles.card}>
                  <VoidRecordRow
                    voidRecord={r}
                    onEdit={onEditVoidRecord}
                    onDelete={onDelete}
                    id={r.getId().getValue()}
                    screenHeight={screenHeight}
                  />
                </Card>
              ),
            }).getElement()
          }
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
