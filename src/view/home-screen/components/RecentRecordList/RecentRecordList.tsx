import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/view/components';
import { ViewRecordVisitor } from '@/view/lib';
import { theme } from '@/view/theme';
import type { Record } from '@/domain/models/Record';
import { RecordListEmptyComponent } from '@/view/home-screen/components/RecentRecordList/RecordListEmptyComponent';

type RecentRecordListProps = {
  records: Record[];
  style?: StyleProp<ViewStyle>;
};

function RecentRecordList({ records, style }: RecentRecordListProps) {
  const rows = records.map((r) => new ViewRecordVisitor(r).getRow());
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
