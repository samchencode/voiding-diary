import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Card, RowRecordVisitor } from '@/view/components';
import { theme } from '@/view/theme';
import type { IntakeRecord, Record, VoidRecord } from '@/domain/models/Record';
import { RecordListEmptyComponent } from '@/view/home-screen/components/RecentRecordList/RecordListEmptyComponent';
import { IntakeRecordRow, VoidRecordRow } from '@/view/components/RecordRow';

type RecentRecordListProps = {
  records: Record[];
  style?: StyleProp<ViewStyle>;
};

function makeIntakeRecordRow(r: IntakeRecord) {
  return (
    <IntakeRecordRow
      id={r.getId().getValue()}
      volume={r.getIntakeVolumeString()}
      time={r.getTimeString()}
    />
  );
}

function makeVoidRecordRow(r: VoidRecord) {
  return (
    <VoidRecordRow
      id={r.getId().getValue()}
      volume={r.getUrineVolumeString()}
      time={r.getTimeString()}
    />
  );
}

function RecentRecordList({ records, style }: RecentRecordListProps) {
  const rows = records.map((r) =>
    new RowRecordVisitor(r, {
      makeIntakeRecordRow,
      makeVoidRecordRow,
    }).getElement()
  );
  const isEmpty = rows.length === 0;

  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.title}>Today</Text>
      {!isEmpty ? <View>{rows}</View> : <RecordListEmptyComponent />}
    </Card>
  );
}

RecentRecordList.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: theme.spaces.lg,
    paddingBottom: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    paddingLeft: theme.spaces.lg,
    marginTop: -6,
  },
});

export { RecentRecordList };
