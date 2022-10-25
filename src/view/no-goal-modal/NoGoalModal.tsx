import React, { useCallback } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Card, Button } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { StatusBar } from '@/view/status-bar';

type NoGoalModalProps = RootNavigationProps<'NoGoalModal'>;

function factory() {
  return function FirstGoalModal({ navigation }: NoGoalModalProps) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const navigateToGoalScreen = useCallback(() => {
      navigation.navigate('App', { screen: 'Goal' });
    }, [navigation]);

    return (
      <View style={styles.container}>
        <StatusBar
          color="transparent"
          statusBarStyle="light"
          hasPadding={false}
        />
        <View style={styles.background} />
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.message}>
            Looks like you have not set a goal yet
          </Text>
          <Button
            title="Set a Goal!"
            onPress={navigateToGoalScreen}
            backgroundColor={theme.colors.primary}
          />
        </Card>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  card: {
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginBottom: theme.spaces.sm,
  },
  message: {
    ...theme.fonts.sm,
    marginBottom: theme.spaces.lg,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
