import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { TargetSvg } from '@/view/goal-screen/svg';
import { theme } from '@/view/theme';
import { Card, Button } from '@/view/components';
import { IntakeInput, TimeInput } from '@/view/goal-screen/components';
import { StatusBar } from '@/view/status-bar';

function factory() {
  return function GoalScreen() {
    const { width } = useWindowDimensions();
    const svgWidth = Math.min(width, 400);
    const svgHeight = (svgWidth * 2) / 3;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar statusBarStyle="dark" color="transparent" />
        <TargetSvg width={svgWidth} height={svgHeight} style={styles.svg} />
        <Card style={styles.card}>
          <Text style={styles.title}>Set Goals</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>AM Void Interval</Text>
            <TimeInput />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PM Void Interval</Text>
            <TimeInput />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Daily Intake</Text>
            <IntakeInput />
          </View>
          <Button.Success title="Set" onPress={() => {}} />
        </Card>
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  contentContainer: {
    paddingTop: theme.spaces.sm,
  },
  svg: {
    marginBottom: -theme.spaces.lg,
  },
  card: {
    margin: theme.spaces.lg,
    marginTop: 0,
    elevation: 5,
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginTop: -theme.spaces.sm,
  },
  label: {
    ...theme.fonts.sm,
  },
  inputGroup: {
    marginBottom: theme.spaces.lg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export type Type = ReturnType<typeof factory>;
export { factory };
