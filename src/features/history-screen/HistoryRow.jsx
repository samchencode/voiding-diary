import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, baseTheme } from '../theme';

function HistoryRow() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="cup"
        size={32}
        color={colors.accent}
        style={styles.icon}
      />
      <Text style={styles.title}>Tea</Text>
      <Text style={styles.subtitle}>12oz</Text>
      <Text style={styles.data}>7:30am</Text>
    </View>
  );
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spaces.sm,
  },
  icon: {
    marginRight: spaces.sm,
  },
  title: {
    ...fonts.mdBold,
  },
  subtitle: {
    ...fonts.sm,
    paddingBottom: 2,
  },
  data: {
    ...fonts.md,
    flex: 1,
    textAlign: 'right',
  },
});

export default HistoryRow;
