import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Card, Button, VolumeInputGroup } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { IntakeRecord } from '@/domain/models/Record';

import type { UpdateRecordAction } from '@/application/UpdateRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import type { Observable } from '@/view/observables';

import { StatusBar } from '@/view/status-bar';

type EditIntakeRecordModalProps = RootNavigationProps<'EditIntakeRecordModal'>;

function factory(
  updateRecordAction: UpdateRecordAction,
  recordsStaleObservable: Observable
) {
  return function EditIntakeRecordModal({
    navigation,
    route,
  }: EditIntakeRecordModalProps) {
    const { intakeRecord } = route.params;
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const [dateAndTime, setDateAndTime] = useState(
      route.params.intakeRecord.getDateAndTime()
    );
    const [volume, setVolume] = useState(intakeRecord.getIntakeVolume());

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date: Date) => {
      setDateAndTime(new DateAndTime(date));
      hideDatePicker();
    };
    const id = intakeRecord.getId();

    const navigateToRecordScreen = useCallback(() => {
      navigation.navigate('App', { screen: 'Record' });
    }, [navigation]);

    const updateRecord = async () => {
      const r = new IntakeRecord(dateAndTime, volume);
      await updateRecordAction.execute(id, r);
      recordsStaleObservable.notifySubscribers();
      navigateToRecordScreen();
    };

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
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Edit Record</Text>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Size</Text>
            <VolumeInputGroup
              value={volume}
              style={styles.volumeInputGroup}
              onChangeValue={setVolume}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Date</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.dateField}>
                <Text>{dateAndTime.getDateString()} </Text>
                <Text>{dateAndTime.getTimeString()} </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            date={dateAndTime.getDate()}
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
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
  subtitle: {
    ...theme.fonts.sm,
  },
  dateField: {
    ...theme.fonts.sm,
    color: theme.colors.accent,
  },
  volumeInputGroup: {},
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  field: {
    marginBottom: theme.spaces.sm,
  },
  button: {
    flex: 1,
    marginLeft: theme.spaces.xs,
    marginRight: theme.spaces.xs,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
