import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, baseTheme } from '../theme';
import { utils } from '../common';

function HistoryRow(props) {
  const {
    icon = 'cup',
    title = "Intake",
    subtitle,
    rightText = '08:31 AM',
  } = props;
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={colors.accent}
        style={styles.icon}
      />
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.data}>{rightText}</Text>
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
