import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { HistoryRow } from '../history-screen';
import { baseTheme } from '../theme';

function HistoryView(props) {
  const { logs } = props;

  return (
    <Card style={[styles.container, props.style]}>
      <Text style={styles.title}>Recent</Text>
      <View>
        {logs.map((l) => (
          <HistoryRow key={l.id} />
        ))}
      </View>
    </Card>
  );
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: spaces.lg,
  },
  title: {
    ...fonts.lg,
    marginTop: -6,
  },
});

export default HistoryView;
