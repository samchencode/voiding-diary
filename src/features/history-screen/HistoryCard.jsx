import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from '../common';
import HistoryRow from './HistoryRow';
import { baseTheme } from '../theme';

function HistoryCard(props) {
  return (
    <Card style={[props.style, styles.container]}>
      <HistoryRow />
    </Card>
  );
}

const { spaces } = baseTheme;

const styles = StyleSheet.create({
  container: {
    padding: spaces.sm,
  },
});

export default HistoryCard;
