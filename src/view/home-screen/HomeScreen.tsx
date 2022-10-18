import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { theme } from '@/view/theme';
import {
  IntakeChart,
  LoggerButtonGroup,
  RecentRecordList,
  Timer as TimerView,
  SplitColorBackground,
} from '@/view/home-screen/components';
import { StatusBar } from '@/view/status-bar';
import type { SaveRecordAction } from '@/application/SaveRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';
import type { Record } from '@/domain/models/Record';
import { IntakeRecord, VoidRecord } from '@/domain/models/Record';
import { RecordsStaleObservable } from '@/view/lib';
import type { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import type { GetTimerAction } from '@/application/GetTimerAction';
import type { GetGoalAction } from '@/application/GetGoalAction';
import { useTimer } from '@/view/home-screen/useTimer';
import type { AppNavigationProps } from '@/view/router';
import type { Goal } from '@/domain/models/Goal';

const makeVoid = () => {
  const datetime = new DateAndTime(new Date());
  const volume = new UnknownVolume();
  return new VoidRecord(datetime, volume);
};

function factory(
  getTodaysRecordsAction: GetTodaysRecordsAction,
  saveRecordAction: SaveRecordAction,
  getTimerAction: GetTimerAction,
  getGoalAction: GetGoalAction
) {
  async function handleNewVoidRecord(record: VoidRecord) {
    await saveRecordAction.execute(record);
    RecordsStaleObservable.notifyAll();
  }

  return function HomeScreen({ navigation }: AppNavigationProps<'Home'>) {
    const navigateToRecordIntakeModal = () => {
      navigation.navigate('RecordIntakeModal');
    };

    const [records, setRecords] = useState<Record[]>([]);
    const [goal, setGoal] = useState<Goal | null>(null);
    const [timer, timeRemaining, timeTotal] = useTimer(
      getTimerAction,
      goal?.getAmTargetVoidInterval() ?? null
    );

    const makeVoidAndStartTimer = useCallback(() => {
      if (!goal) {
        console.log('no amInterval set yet...');
        return makeVoid();
      }
      const durationMs = goal.getAmTargetVoidInterval().getMillisecondsTotal();
      const endsAt = new Date(Date.now() + durationMs);
      timer!.start(endsAt);
      return makeVoid();
    }, [goal, timer]);

    useEffect(() => {
      getGoalAction
        .execute()
        .then((g) => setGoal(g))
        .catch(() => {
          navigation.navigate('NoGoalModal');
        });
    }, [navigation]);

    useEffect(() => {
      getTodaysRecordsAction.execute().then((r) => setRecords(r));
      RecordsStaleObservable.subscribe(() => {
        getTodaysRecordsAction.execute().then((r) => setRecords(r));
      });
    }, []);

    const totalIntake = records
      .filter((r) => r instanceof IntakeRecord)
      .map((r) => r as IntakeRecord)
      .reduce((ag, v: IntakeRecord) => v.getIntakeVolume().getValue() + ag, 0);

    return (
      <SplitColorBackground
        color1={theme.colors.primary}
        color2={theme.colors.bg}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
        >
          <StatusBar
            color={theme.colors.primary}
            statusBarStyle="light"
            elevated
          />
          <TimerView
            onPress={() => handleNewVoidRecord(makeVoidAndStartTimer())}
            timeElapsedMs={timeTotal - timeRemaining}
            timeRemainingMs={timeRemaining}
          />
          <View style={styles.cardContainer}>
            <LoggerButtonGroup
              style={styles.item}
              onPressIntake={() => navigateToRecordIntakeModal()}
              onPressVoid={() => handleNewVoidRecord(makeVoidAndStartTimer())}
            />
            <IntakeChart style={styles.item} goal={goal} intake={totalIntake} />
            <RecentRecordList
              style={[styles.item, styles.lastItem]}
              records={records}
            />
          </View>
        </ScrollView>
      </SplitColorBackground>
    );
  };
}

const styles = StyleSheet.create({
  scrollView: {},
  scrollContainer: {
    backgroundColor: theme.colors.bg,
  },
  cardContainer: {
    marginTop: theme.spaces.lg,
    marginLeft: theme.spaces.lg,
    marginRight: theme.spaces.lg,
  },
  item: {
    marginTop: theme.spaces.lg,
  },
  lastItem: {
    marginBottom: theme.spaces.lg,
  },
});

export type Type = ReturnType<typeof factory>;
export { factory };
