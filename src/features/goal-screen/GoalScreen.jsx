import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useTheme, baseTheme } from '../theme';
import StatusBar from '../status-bar';
import { Card, Button } from '../common';
import SvgTarget from './svg/Target';
import { TimeInput, IntakeInput } from './Input';

function GoalScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const svgWidth = Math.min(width, 400);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar statusBarStyle="dark" color={colors.bg} />
      <SvgTarget width={svgWidth} height={0.66 * svgWidth} style={styles.svg} />
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
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingTop: spaces.sm,
  },
  svg: {
    marginBottom: -spaces.lg,
  },
  card: {
    margin: spaces.lg,
    marginTop: 0,
    padding: spaces.lg,
    elevation: 5,
  },
  title: {
    ...fonts.lg,
    marginTop: -spaces.sm,
  },
  label: {
    ...fonts.sm,
  },
  inputGroup: {
    marginBottom: spaces.lg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default GoalScreen;
