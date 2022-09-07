import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/view/components';
import { ViewRecordVisitor } from '@/view/lib';
import { theme } from '@/view/theme';
import type { Record } from '@/domain/models/Record';

type RecentRecordListProps = {
  records: Record[];
  style?: StyleProp<ViewStyle>;
};

function RecentRecordList({ records, style }: RecentRecordListProps) {
  const rows = records.map((r) => new ViewRecordVisitor(r).getRow());

  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.title}>Recent</Text>
      <View>{rows}</View>
    </Card>
  );
}

RecentRecordList.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginTop: -6,
  },
});

export { RecentRecordList };
