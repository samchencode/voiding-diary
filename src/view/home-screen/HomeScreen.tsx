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
import { RecordIntakeModal } from '@/view/modals/RecordIntakeModal';
import { FirstGoalModal } from '@/view/modals/FirstGoalModal';
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
import type { Timer } from '@/domain/models/Timer';
import type { GetGoalAction } from '@/application/GetGoalAction';
import type { TimeInMins } from '@/domain/models/TimeInMins';
import type { SetGoalAction } from '@/application/SetGoalAction';

const makeIntake = (amount: number) => {
  const datetime = new DateAndTime(new Date());
  const volume = new VolumeInOz(amount);
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
  getTimerAction: GetTimerAction,
  getGoalAction: GetGoalAction,
  setGoalAction: SetGoalAction
) {
  async function handleNewRecord(record: Record) {
    await saveRecordAction.execute(record);
    RecordsStaleObservable.notifyAll();
  }

  function handleResetDb() {
    // @ts-expect-error for debug only
    expoSqliteDatabase.deleteDb();
    asyncStorageGoalRepository.reset();
  }

  return function HomeScreen() {
    const [recordIntakeModalVisible, setRecordIntakeModalVisible] =
      useState(false);
    const [firstGoalModalVisible, setFirstGoalModalVisible] = useState(false);
    const recordIntake = (amount: number) => {
      handleNewRecord(makeIntake(amount));
    };

    const [timeTotal, setTimeTotal] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [records, setRecords] = useState<Record[]>([]);

    const [timer, loadTimer] = useState<Timer | null>(null);

    const [amInterval, setAmInterval] = useState<TimeInMins | null>(null);

    const makeVoidAndStartTimer = () => {
      if (!amInterval) {
        console.log('no amInterval set yet...');
        return makeVoid();
      }
      const durationMs = amInterval.getMinutesTotal() * 60 * 1000;
      const endsAt = new Date(Date.now() + durationMs);
      timer!.start(endsAt);
      return makeVoid();
    };

    useEffect(() => {
      getTimerAction.execute().then((t) => {
        t.configure((b) => {
          b.configureIdleState((s) => {
            s.addOnStartListener((endsAt) => {
              setTimeTotal(endsAt.getTime() - Date.now());
            });
          });
          b.configureTickingState((s) => {
            s.addOnRestartListener((endsAt) => {
              setTimeTotal(endsAt.getTime() - Date.now());
            });
            s.addOnTickListener((ms) => {
              setTimeRemaining(ms);
            });
            s.addOnFinishListener(() => {
              setTimeRemaining(0);
            });
          });
        });
        loadTimer(t);
      });

      getGoalAction
        .execute()
        .then((g) => setAmInterval(g.getAmTargetVoidInterval()))
        .catch(() => {
          console.log('no goal set yet...');
          setFirstGoalModalVisible(true);
        });
    }, []);

    useEffect(() => {
      getTodaysRecordsAction.execute().then((r) => setRecords(r));
      RecordsStaleObservable.subscribe(() => {
        getTodaysRecordsAction.execute().then((r) => setRecords(r));
      });
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
            onPress={() => handleNewRecord(makeVoidAndStartTimer())}
            timeElapsedMs={timeTotal - timeRemaining}
            timeRemainingMs={timeRemaining}
          />
          <View style={styles.cardContainer}>
            <LoggerButtonGroup
              style={styles.item}
              onPressIntake={() => {
                setRecordIntakeModalVisible(true);
              }}
              onPressVoid={() => handleNewRecord(makeVoidAndStartTimer())}
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
          <RecordIntakeModal
            visible={recordIntakeModalVisible}
            recordIntake={recordIntake}
            setModalVisible={setRecordIntakeModalVisible}
          />
          <FirstGoalModal
            visible={firstGoalModalVisible}
            setModalVisible={setFirstGoalModalVisible}
            setGoalAction={setGoalAction}
            getGoalAction={getGoalAction}
          />
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
