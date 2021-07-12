import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import HistoryCard from './HistoryCard';
import Separator from './Separator';
import d3 from '../../lib/d3';
import data from './data';

const parseDatetime = d3.timeParse('%Y-%m-%d %H:%M:%S');

const DATA = data
  .map((d) => {
    const datum = Object.assign({}, d);
    datum.datetime = parseDatetime(d.datetime);
    return datum;
  })
  .sort((d1, d2) => d1.datetime < d2.datetime);

function HistoryScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <HistoryCard
            style={[styles.card, index !== 0 && styles.belowTopCard]}
          />
        )}
        ItemSeparatorComponent={(props) => (
          <Separator style={styles.separator} data={DATA} {...props} />
        )}
        keyExtractor={(item) => '' + item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  belowTopCard: {
    marginTop: 0,
  },
  separator: {
    marginLeft: 16,
    marginRight: 16,
  },
});

export default HistoryScreen;
