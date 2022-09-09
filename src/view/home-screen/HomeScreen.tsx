import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { theme } from '@/view/theme';
import {
  IntakeChart,
  LoggerButtonGroup,
  RecentRecordList,
  Timer,
  SplitColorBackground,
} from '@/view/home-screen/components';
import { StatusBar } from '@/view/status-bar';
import type { SaveRecordAction } from '@/application/SaveRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { VolumeInMl } from '@/domain/models/Volume';
import type { Record } from '@/domain/models/Record';
import { IntakeRecord, VoidRecord } from '@/domain/models/Record';
import { RecordsStaleObservable } from '@/view/lib';

const makeIntake = () => {
  const datetime = new DateAndTime(new Date());
  const volume = new VolumeInMl(30);
  return new IntakeRecord(datetime, volume);
};

const makeVoid = () => {
  const datetime = new DateAndTime(new Date());
  const volume = new VolumeInMl(30);
  return new VoidRecord(datetime, volume);
};

function factory(saveRecordAction: SaveRecordAction) {
  async function handleNewRecord(makeRecord: () => Record) {
    const record = makeRecord();
    await saveRecordAction.execute(record);
    RecordsStaleObservable.notifyAll();
  }

  return function HomeScreen() {
    const timeElapsed = 0;
    const timeRemaining = 0;

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
          <Timer
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
            <RecentRecordList
              style={[styles.item, styles.lastItem]}
              records={[]}
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
