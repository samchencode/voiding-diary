import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import d3 from '../../lib/d3';

function HistorySeparator(props) {
  const { datetime } = props;

  const formatMonth = d3.timeFormat('%b');
  const formatDate = d3.timeFormat('%e');
  const formatDay = d3.timeFormat('%A');

  return (
    <View style={[props.style, styles.container]}>
      <View style={styles.labelContainer}>
        <Text style={styles.dateLabel}>
          {formatDay(datetime)}, {formatMonth(datetime)}{' '}
          {formatDate(datetime).trim()}
        </Text>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  dateLabel: {
    fontFamily: 'Roboto_300Light',
    fontSize: 18,
  },
  line: {
    flex: 1,
    height: 0,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
});

export default HistorySeparator;
