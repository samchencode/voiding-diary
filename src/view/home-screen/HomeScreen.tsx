import React, { useState, useEffect } from 'react';
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
import { VolumeInOz } from '@/domain/models/Volume';
import type { Record } from '@/domain/models/Record';
import { IntakeRecord, VoidRecord } from '@/domain/models/Record';
import { RecordsStaleObservable } from '@/view/lib';
import type { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import { Button, Card } from '@/view/components';
import type { WebSQLDatabase } from 'expo-sqlite';
import type { AsyncStorageGoalRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageGoalRepository';
import type { GetTimerAction } from '@/application/GetTimerAction';

const makeIntake = () => {
  const datetime = new DateAndTime(new Date());
  const volume = new VolumeInOz(30);
  return new IntakeRecord(datetime, volume);
};

const makeVoid = () => {
  const datetime = new DateAndTime(new Date());
  const volume = new VolumeInOz(30);
  return new VoidRecord(datetime, volume);
};

function factory(
  getTodaysRecordsAction: GetTodaysRecordsAction,
  saveRecordAction: SaveRecordAction,
  expoSqliteDatabase: WebSQLDatabase,
  asyncStorageGoalRepository: AsyncStorageGoalRepository,
  getTimerAction: GetTimerAction
) {
  async function handleNewRecord(makeRecord: () => Record) {
    const record = makeRecord();
    await saveRecordAction.execute(record);
    RecordsStaleObservable.notifyAll();
  }

  function handleResetDb() {
    // @ts-expect-error for debug only
    expoSqliteDatabase.deleteDb();
    asyncStorageGoalRepository.reset();
  }

  return function HomeScreen() {
    const timeElapsed = 0;
    const timeRemaining = 0;

    const [records, setRecords] = useState<Record[]>([]);
    useEffect(() => {
      getTodaysRecordsAction.execute().then((r) => setRecords(r));
      RecordsStaleObservable.subscribe(() => {
        getTodaysRecordsAction.execute().then((r) => setRecords(r));
      });

      // DEBUG: set 1 sec timer
      const endAt = new Date(Date.now() + 10000);
      getTimerAction.execute().then((t) => t.start(endAt));
    }, []);

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
            onPress={() => handleNewRecord(makeVoid)}
            timeElapsedMs={timeElapsed}
            timeRemainingMs={timeRemaining}
          />
          <View style={styles.cardContainer}>
            <LoggerButtonGroup
              style={styles.item}
              onPressIntake={() => handleNewRecord(makeIntake)}
              onPressVoid={() => handleNewRecord(makeVoid)}
            />
            <IntakeChart style={styles.item} goal={32} intake={8} />
            <RecentRecordList style={styles.item} records={records} />
            <Card style={[styles.item, styles.lastItem]}>
              <Button.Danger
                title="Reset Database"
                onPress={() => handleResetDb()}
              />
            </Card>
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
