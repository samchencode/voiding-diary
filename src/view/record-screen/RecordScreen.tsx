import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import type { InternMap } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  RecordSectionHeader,
  ListHeader,
  ListEmpty,
  Menu,
} from '@/view/record-screen/components';
import type { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import type { Record } from '@/domain/models/Record';
import { RecordsStaleObservable, ViewRecordVisitor } from '@/view/lib';
import type { ExportReportOfAllRecordsAsPdfAction } from '@/application/ExportReportOfAllRecordsAsPdfAction';

export function factory(
  getAllRecordsAction: GetAllRecordsAction,
  exportReportOfAllRecordsAsPdfAction: ExportReportOfAllRecordsAsPdfAction
) {
  const getAndGroupRecords = async () =>
    getAllRecordsAction
      .execute()
      .then((res) => d3.group(res, (r) => r.getDateString()));

  const handlePressExport = () => {
    exportReportOfAllRecordsAsPdfAction.execute();
  };

  const renderMenu = () => <Menu onPressExport={handlePressExport} />;

  return function RecordScreen() {
    type Date = string;
    type RecordsByDate = InternMap<Date, Record[]>;
    const [records, setRecords] = useState<RecordsByDate>(new Map());

    useEffect(() => {
      getAndGroupRecords().then((v) => setRecords(v));
      RecordsStaleObservable.subscribe(() => {
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
            const Card = new ViewRecordVisitor(item).makeCard();
            return <Card style={styles.card} />;
          }}
          renderSectionHeader={({ section }) => (
            <RecordSectionHeader date={section.title} />
          )}
          keyExtractor={(item) => ViewRecordVisitor.makeKey(item)}
          ListHeaderComponent={<ListHeader renderMenu={renderMenu} />}
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
