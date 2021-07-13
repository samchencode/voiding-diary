import React, { useState } from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { useTheme, baseTheme } from '../theme';
import HistoryCard from './HistoryCard';
import Separator from './Separator';
import d3 from '../../lib/d3';
import data from './data';

const parseDatetime = d3.timeParse('%Y-%m-%d %H:%M:%S');

const DATA = Object.values(
  data
    .map((d) => {
      const datum = Object.assign({}, d);
      datum.datetime = parseDatetime(d.datetime);
      return datum;
    })
    .reduce((ag, v) => {
      const makeDateStr = (dt) =>
        dt.getDay() + ' ' + dt.getMonth() + ' ' + dt.getYear();

      let arr;
      if ((arr = ag[makeDateStr(v.datetime)]?.data)) {
        arr.push(v);
      } else {
        ag[makeDateStr(v.datetime)] = {
          datetime: v.datetime,
          data: [v],
        };
      }

      return ag;
    }, {})
).sort((s1, s2) => s1.datetime < s2.datetime);

function HistoryScreen() {
  const { colors } = useTheme();

  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const [contentSize, setContentSize] = useState({ height: 0, width: 0 });

  const handleScroll = ({ nativeEvent: e }) => {
    setContentOffset(e.contentOffset);
    setContentSize(e.contentSize);
  };

  return (
    <SectionList
      style={[styles.container, { backgroundColor: colors.bg }]}
      sections={DATA}
      renderItem={({ item }) => (
        <HistoryCard style={[styles.card, styles.belowTopCard]} />
      )}
      renderSectionHeader={({ section }) => (
        <Separator style={styles.separator} datetime={section.datetime} />
      )}
      keyExtractor={(item) => '' + item.id}
      onScroll={handleScroll}
      ListHeaderComponent={() => <Text style={styles.title}>History</Text>}
    />
  );
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title: {
    ...fonts.lg,
    marginTop: spaces.sm,
    marginLeft: spaces.lg,
    marginBottom: spaces.sm,
  },
  card: {
    margin: spaces.lg,
  },
  belowTopCard: {
    marginTop: 0,
  },
  separator: {
    marginLeft: spaces.lg,
    marginRight: spaces.lg,
  },
});

export default HistoryScreen;
