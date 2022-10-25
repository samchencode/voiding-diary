import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Card } from '@/view/components';
import type { RootNavigationProps } from '@/view/router';
import { theme } from '@/view/theme';
import { StatusBar } from '@/view/status-bar';
import { A } from '@/view/attributions-modal/components';

function factory() {
  return function AttributionsModal({
    navigation,
  }: RootNavigationProps<'AttributionsModal'>) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const goBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    return (
      <View style={styles.container}>
        <StatusBar
          color="transparent"
          statusBarStyle="light"
          hasPadding={false}
        />
        <TouchableWithoutFeedback onPress={goBack}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Attributions</Text>
          <Text style={styles.message}>
            Sound &quot;Mario Jumping&quot; by Mike Koenig, found{' '}
            <A url="https://soundbible.com/1601-Mario-Jumping.html">here</A>,
            was used without modification. This sound was released with a
            Creative Commons Attribution 3.0 Unported License, the fulltext of
            which can be found{' '}
            <A url="https://creativecommons.org/licenses/by/3.0/legalcode">
              here
            </A>
            .
          </Text>
          <Button
            title="Back"
            onPress={goBack}
            backgroundColor={theme.colors.accent}
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
