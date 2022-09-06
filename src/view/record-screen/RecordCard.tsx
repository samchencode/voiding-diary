import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Card } from '@/view/components';
import { theme } from '@/view/theme';

type RecordCardProps = {
  recordRow: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

export function RecordCard({ recordRow, style }: RecordCardProps) {
  return <Card style={[styles.card, style]}>{recordRow}</Card>;
}

RecordCard.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spaces.xs,
  },
});
