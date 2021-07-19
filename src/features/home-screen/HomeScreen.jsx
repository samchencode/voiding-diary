import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';
import LoggerButtonGroup from './LoggerButtonGroup';
import HistoryView from './HistoryView';
import StatusBar from '../status-bar';
import Timer from '../timer';
import { VoidNotification } from '../notification';

const timer = new Timer();
const notification = new VoidNotification();

const handleVoid = (seconds) => {
  timer.start({ milliseconds: seconds * 1000 });
  notification.schedule({ seconds });
};

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [time, setTime] = useState({
    timeRemaining: null,
    timeElapsed: null,
    ticking: false,
  });

  useEffect(() => {
    timer.setOnTick(({ timeRemaining, timeElapsed }) =>
      setTime({ timeRemaining, timeElapsed, ticking: true })
    );

    timer.setOnEnd(() => {
      setTime({ timeRemaining: null, timeElapsed: null, ticking: false });
    });

    notification.setNotificationInteractionListener(() => handleVoid(60));

    return () => {
      timer.destroy();
      notification.destroy();
    }
  }, []);

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
