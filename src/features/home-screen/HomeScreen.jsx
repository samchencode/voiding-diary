import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { utils } from '../common';
import { add, selectTodaysTotalIntake, selectLastThreeLogs } from '../history';
import { useTheme, baseTheme } from '../theme';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';
import LoggerButtonGroup from './LoggerButtonGroup';
import HistoryView from './HistoryView';
import StatusBar from '../status-bar';
import useTimer from './useTimer';
import Timer from '../timer';
import { VoidNotification } from '../notification';

const { formatIso } = utils.date;

const timer = new Timer();
const notification = new VoidNotification();

const toggleVoidTimerAndNotification = (seconds) => {
  notification.dismissAll();
  const start = async () => {
    timer.start({ milliseconds: seconds * 1000 });
    await notification.schedule({ seconds });
  };

  const reset = async () => {
    timer.reset();
    await notification.cancel();
  };

  if (timer.state === Timer.BEFORE_START) {
    start();
  } else {
    reset().then(start);
  }
};

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const time = useTimer({ timer, handleVoid, notification });

  const dispatch = useDispatch();

  const handleVoid = (s) => {
    toggleVoidTimerAndNotification(s);
    dispatch(
      add({
        type: 'void',
        datetime: formatIso(new Date()),
      })
    );
  };

  const totalIntake = useSelector(selectTodaysTotalIntake);
  const recentLogs = useSelector(selectLastThreeLogs);

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: colors.primary }]}
      contentContainerStyle={{ backgroundColor: colors.bg }}
    >
      <StatusBar color={colors.primary} statusBarStyle="light" elevated />
      <TimerView time={time} onPressVoid={() => handleVoid(60)} />
      <View style={styles.cardContainer}>
        <LoggerButtonGroup
          style={styles.item}
          onPressIntake={() => navigation.navigate('EditModal')}
          onPressVoid={() => handleVoid(60)}
        />
        <IntakeChart style={styles.item} intake={totalIntake} goal={32} />
        <HistoryView style={[styles.item, styles.lastItem]} logs={recentLogs} />
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
