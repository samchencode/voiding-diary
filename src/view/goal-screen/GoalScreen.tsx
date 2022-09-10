import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TargetSvg } from '@/view/goal-screen/svg';
import { theme } from '@/view/theme';
import { Card, Button } from '@/view/components';
import {
  IntakeInput,
  TimeInput,
  InputRoot,
} from '@/view/goal-screen/components';
import { StatusBar } from '@/view/status-bar';
import type { GetGoalAction } from '@/application/GetGoalAction';
import { useGoal } from '@/view/goal-screen/useGoal';
import { useDimensions } from '@/view/goal-screen/useDimensions';

function factory(getGoalAction: GetGoalAction) {
  return function GoalScreen() {
    const { width, height, tabBarHeight, statusBarHeight } = useDimensions();

    const inputRoot = React.useRef<InputRoot>(null);

    const handlePress = () => {
      if (inputRoot.current) inputRoot.current.blur();
    };

    const [
      [amInterval, setAmInterval],
      [pmInterval, setPmInterval],
      [volume, setVolume],
    ] = useGoal(getGoalAction);

    const allFieldsFilled = ![amInterval, pmInterval, volume]
      .flat()
      .includes(undefined);

    const buttonDisabled = !allFieldsFilled;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <InputRoot ref={inputRoot}>
          <View style={{ minHeight: height - tabBarHeight - statusBarHeight }}>
            <StatusBar statusBarStyle="dark" color="transparent" />
            <TargetSvg
              screenWidth={width}
              maxWidth={400}
              style={styles.svg}
              themeColor={theme.colors.primary}
            />
            <Card style={styles.card}>
              <Text style={styles.title}>Set Goals</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>AM Void Interval</Text>
                <TimeInput value={amInterval} onChangeValue={setAmInterval} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>PM Void Interval</Text>
                <TimeInput value={pmInterval} onChangeValue={setPmInterval} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Daily Intake</Text>
                <IntakeInput value={volume} onChangeNumber={setVolume} />
              </View>
              <Button
                title="Set"
                onPress={handlePress}
                backgroundColor={theme.colors.accent}
                disabled={buttonDisabled}
              />
            </Card>
          </View>
        </InputRoot>
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
