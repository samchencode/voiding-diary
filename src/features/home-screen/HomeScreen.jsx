import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';
import LoggerButtonGroup from './LoggerButtonGroup';
import HistoryView from './HistoryView';

function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: colors.primary }]}
      contentContainerStyle={{ backgroundColor: colors.bg }}
    >
      <TimerView />
      <View style={styles.cardContainer}>
        <LoggerButtonGroup
          style={styles.item}
          onPressIntake={() => navigation.navigate('EditModal')}
          onPressVoid={() => {}}
        />
        <IntakeChart style={styles.item} />
        <HistoryView style={[styles.item, styles.lastItem]} />
      </View>
    </ScrollView>
  );
}

const { spaces } = baseTheme;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  cardContainer: {
    marginLeft: spaces.lg,
    marginRight: spaces.lg,
  },
  item: {
    marginTop: spaces.lg,
  },
  lastItem: {
    marginBottom: spaces.lg,
  },
});

export default HomeScreen;
