import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';
import LoggerButtonGroup from './LoggerButtonGroup';
import HistoryView from './HistoryView';
import StatusBar from '../status-bar';
import Timer from '../timer';
import { scheduleLocalNotification } from '../notification';

const timer = new Timer();

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [time, setTime] = useState({
    timeRemaining: null,
    timeElapsed: null,
  });

  useEffect(() => {
    timer.setOnTick(({ timeRemaining, timeElapsed }) =>
      setTime({ timeRemaining, timeElapsed })
    );

    return () => timer.destroy();
  }, []);

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: colors.primary }]}
      contentContainerStyle={{ backgroundColor: colors.bg }}
    >
      <StatusBar color={colors.primary} statusBarStyle="light" elevated />
      <TimerView time={time} />
      <View style={styles.cardContainer}>
        <LoggerButtonGroup
          style={styles.item}
          onPressIntake={() => navigation.navigate('EditModal')}
          onPressVoid={() => {
            timer.start({ milliseconds: 60000 });
            scheduleLocalNotification({
              title: 'Void Interval Reached',
              body: 'Record a new void',
              seconds: 60,
            })
          }}
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
