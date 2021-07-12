import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from '../common';
import HistoryRow from './HistoryRow';

function HistoryCard(props) {
  return (
    <Card style={[props.style, styles.container]}>
      <HistoryRow />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default HistoryCard;
