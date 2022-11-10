import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Card, Button } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import type { UpdateRecordAction } from '@/application/UpdateRecordAction';
import type { Observable } from '@/view/observables';
import { StatusBar } from '@/view/status-bar';
import { IntakeRecordInputGroup } from '@/view/edit-intake-record-modal/components';

type EditIntakeRecordModalProps = RootNavigationProps<'EditIntakeRecordModal'>;

function factory(
  updateRecordAction: UpdateRecordAction,
  recordsStaleObservable: Observable
) {
  return function EditIntakeRecordModal({
    navigation,
    route,
  }: EditIntakeRecordModalProps) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const { intakeRecord: initialIntakeRecord } = route.params;
    const navigateToRecordScreen = useCallback(
      () => navigation.navigate('App', { screen: 'Record' }),
      [navigation]
    );

    const id = useMemo(
      () => initialIntakeRecord.getId(),
      [initialIntakeRecord]
    );

    const [intakeRecord, setIntakeRecord] = useState(initialIntakeRecord);

    const updateRecord = useCallback(async () => {
      await updateRecordAction.execute(id, intakeRecord);
      recordsStaleObservable.notifySubscribers();
      navigateToRecordScreen();
    }, [id, intakeRecord, navigateToRecordScreen]);

    const goBack = useCallback(() => navigation.goBack(), [navigation]);

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
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Edit Record</Text>
          <IntakeRecordInputGroup
            intakeRecord={intakeRecord}
            onChangeRecord={setIntakeRecord}
          />
          <View style={styles.buttonGroup}>
            <Button
              title="Back"
              onPress={goBack}
              backgroundColor={theme.colors.gray}
              style={styles.button}
            />
            <Button
              title="Update"
              onPress={updateRecord}
              backgroundColor={theme.colors.accent}
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
  field: {
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
