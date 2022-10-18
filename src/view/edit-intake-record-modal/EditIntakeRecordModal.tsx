import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Card, Button, SizeOptionOther } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { IntakeRecord } from '@/domain/models/Record';

import type { UpdateRecordAction } from '@/application/UpdateRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RecordsStaleObservable } from '@/view/lib';

type EditIntakeRecordModalProps = RootNavigationProps<'EditIntakeRecordModal'>;

function factory(updateRecordAction: UpdateRecordAction) {
  return function EditIntakeRecordModal({
    navigation,
    route,
  }: EditIntakeRecordModalProps) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const [dateAndTime, setDateAndTime] = useState(
      route.params.intakeRecord.getDateAndTime()
    );
    const [volume, setVolume] = useState(
      route.params.intakeRecord.getIntakeVolumeString()
    );

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
    const id = route.params.intakeRecord.getId();

    const navigateToRecordScreen = useCallback(() => {
      navigation.navigate('App', { screen: 'Record' });
    }, [navigation]);

    const updateRecord = async () => {
      // new UnknownVolume()
      const r = new IntakeRecord(dateAndTime, new VolumeInOz(volume));
      await updateRecordAction.execute(id, r);
      RecordsStaleObservable.notifyAll();
      navigateToRecordScreen();
    };

    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Edit Intake Record</Text>
          <View style={styles.row}>
            <Text style={styles.sizeText}>Size: </Text>
            <SizeOptionOther setSize={setVolume} size={volume} />
          </View>

          <View style={styles.row}>
            <Text style={styles.subtitle}>Date: </Text>
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
          <Button.Success title="Update Record" onPress={updateRecord} />
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
    ...theme.fonts.md,
  },
  dateField: {
    ...theme.fonts.md,
    color: theme.colors.accent,
  },
  sizeText: {
    ...theme.fonts.md,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spaces.sm,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;