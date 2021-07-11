import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { HistoryRow } from '../history-screen';

function HistoryView(props) {
  return (
    <Card style={[styles.container, props.style]}>
      <Text style={styles.title}>History</Text>
      <View>
        <HistoryRow />
        <HistoryRow />
        <HistoryRow />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
    marginTop: -12,
    marginBottom: -6,
  }
})

export default HistoryView;
