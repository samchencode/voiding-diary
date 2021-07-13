import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card } from '../common';
import SvgTarget from './svg/Target';
import Button from './Button';
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
        <Button title="Save" />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingTop: 16,
  },
  svg: {
    marginBottom: -16,
  },
  card: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    elevation: 5,
  },
  title: {
    marginTop: -8,
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Roboto_300Light',
  },
  inputGroup: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default GoalScreen;
