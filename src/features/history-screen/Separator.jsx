import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import d3 from '../../lib/d3';

const isDiffDate = (date1, date2) => {
  if (
    date1.getYear() !== date2.getYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDay() !== date2.getDay()
  )
    return true;
  return false;
};

function HistorySeparator(props) {
  const { leadingItem } = props;
  const trailingItemIdx = props.data.indexOf(leadingItem) + 1;
  const trailingItem = props.data[trailingItemIdx];

  if (!isDiffDate(leadingItem.datetime, trailingItem.datetime)) {
    return null;
  }

  const { datetime } = trailingItem;

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
