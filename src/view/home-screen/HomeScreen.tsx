import React, { useState } from 'react';
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
import { RecordIntakeModal } from '@/view/modals/RecordIntakeModal';

function factory() {
  return function HomeScreen() {
    const [recordIntakeModalVisible, setRecordIntakeModalVisible] =
      useState(true);
    const timeElapsed = 0;
    const timeRemaining = 0;
    const recordIntake = (beverage: string, size: number, time: number) => {
      const newString = `recorded ${beverage}${size}${time}`;
      alert(newString);
    };
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
            onPress={() => alert('pressed timer')}
            timeElapsedMs={timeElapsed}
            timeRemainingMs={timeRemaining}
          />
          <View style={styles.cardContainer}>
            <LoggerButtonGroup
              style={styles.item}
              onPressIntake={() => {
                setRecordIntakeModalVisible(true);
              }}
              onPressVoid={() => alert('pressed void')}
            />
            <IntakeChart style={styles.item} goal={32} intake={8} />
            <RecentRecordList
              style={[styles.item, styles.lastItem]}
              records={[]}
            />
          </View>
          <RecordIntakeModal
            visible={recordIntakeModalVisible}
            recordIntake={recordIntake}
            setModalVisible={setRecordIntakeModalVisible}
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
