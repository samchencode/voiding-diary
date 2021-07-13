import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { HistoryRow } from '../history-screen';
import { baseTheme } from '../theme';

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

const { spaces } = baseTheme;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: spaces.lg,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
  }
})

export default HistoryView;
