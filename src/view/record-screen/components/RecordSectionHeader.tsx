import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';

type SectionHeaderProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

function SectionHeader({ title, style }: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { borderBottomColor: theme.colors.gray }]} />
      <View style={styles.labelContainer}>
        <Text style={styles.labelTitle}>{title}</Text>
      </View>
    </View>
  );
}

SectionHeader.defaultProps = {
  style: {},
};

type RecordSectionHeaderProps = {
  date: string;
  style?: StyleProp<ViewStyle>;
};

function RecordSectionHeader({ date, style }: RecordSectionHeaderProps) {
  return <SectionHeader title={date} style={style} />;
}

RecordSectionHeader.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spaces.lg,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: theme.spaces.lg,
  },
  labelTitle: {
    ...theme.fonts.sm,
  },
  line: {
    flex: 1,
    height: 0,
    borderBottomWidth: 2,
  },
});

export { RecordSectionHeader };
