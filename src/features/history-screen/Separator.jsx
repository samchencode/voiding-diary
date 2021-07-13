import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';
import d3 from '../../lib/d3';

function HistorySeparator(props) {
  const { datetime } = props;

  const formatMonth = d3.timeFormat('%b');
  const formatDate = d3.timeFormat('%e');
  const formatDay = d3.timeFormat('%A');

  const { colors } = useTheme();

  return (
    <View style={[props.style, styles.container]}>
      <View style={styles.labelContainer}>
        <Text style={styles.dateLabel}>
          {formatDay(datetime)}, {formatMonth(datetime)}{' '}
          {formatDate(datetime).trim()}
        </Text>
      </View>
      <View style={[styles.line, { borderBottomColor: colors.gray }]} />
    </View>
  );
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.lg,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: spaces.lg,
  },
  dateLabel: {
    ...fonts.sm,
  },
  line: {
    flex: 1,
    height: 0,
    borderBottomWidth: 2,
  },
});

export default HistorySeparator;
