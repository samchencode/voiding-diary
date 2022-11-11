import React, { useCallback } from 'react';
import type { DeleteRecordAction } from '@/application/DeleteRecordAction';
import { Card, Button } from '@/view/components';
import { StatusBar } from '@/view/status-bar';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import type { Observable } from '@/view/observables';
import { RecordId } from '@/domain/models/Record';

type ConfirmDeleteModalProps = RootNavigationProps<'ConfirmDeleteModal'>;

function factory(
  deleteRecordAction: DeleteRecordAction,
  recordsStaleObservable: Observable
) {
  return function ConfirmDeleteModal({
    navigation,
    route,
  }: ConfirmDeleteModalProps) {
    const { recordId } = route.params;

    const navigateToRecordScreen = useCallback(() => {
      navigation.navigate('App', { screen: 'Record' });
    }, [navigation]);

    const deleteRecord = useCallback(async () => {
      await deleteRecordAction.execute(new RecordId(recordId));
      recordsStaleObservable.notifySubscribers();
      navigateToRecordScreen();
    }, [navigateToRecordScreen, recordId]);

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
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Card style={styles.card}>
          <Text style={styles.title}>
            Are you sure you would like to delete?
          </Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Back"
              onPress={goBack}
              backgroundColor={theme.colors.gray}
              style={styles.button}
            />
            <Button
              title="Delete"
              onPress={deleteRecord}
              backgroundColor={theme.colors.danger}
              style={styles.button}
            />
          </View>
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginLeft: theme.spaces.xs,
    marginRight: theme.spaces.xs,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
