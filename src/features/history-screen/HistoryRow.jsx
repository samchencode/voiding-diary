import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme';

function HistoryRow() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="cup" size={32} color={colors.accent} style={styles.icon}/>
      <Text style={styles.title}>Tea</Text>
      <Text style={styles.subtitle}>12oz</Text>
      <Text style={styles.data}>7:30am</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingBottom: 12,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Roboto_300Light',
    paddingBottom: 2,
  },
  data: {
    fontSize: 24,
    fontFamily: 'Roboto_300Light',
    flex: 1,
    textAlign: 'right',
  },
});

export default HistoryRow;
