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

function factory() {
  return function AboutUsModal({
    navigation,
  }: RootNavigationProps<'AboutUsModal'>) {
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
          <Text style={styles.title}>Voiding Diary</Text>
          <Text style={styles.message}>
            This app aims to help patients with urinary incontinence record
            their fluid intakes and outputs. It features a timer which assists
            the patient with &quot;bladder training&quot;. Created by Andrew
            Goldmann, Sam Chen, and John Paliakkara.
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
