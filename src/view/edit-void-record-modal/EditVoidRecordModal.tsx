import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';

import { Button, SizeOptionOther, Card } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { VoidRecord } from '@/domain/models/Record';

import type { UpdateRecordAction } from '@/application/UpdateRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { VolumeInOz } from '@/domain/models/Volume';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import type { Observable } from '@/view/observables';

import { StatusBar } from '@/view/status-bar';

type EditVoidRecordModalProps = RootNavigationProps<'EditVoidRecordModal'>;

function factory(
  updateRecordAction: UpdateRecordAction,
  recordsStaleObservable: Observable
) {
  return function EditVoidRecordModal({
    navigation,
    route,
  }: EditVoidRecordModalProps) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const [dateAndTime, setDateAndTime] = useState(
      route.params.voidRecord.getDateAndTime()
    );
    const [volume, setVolume] = useState(
      route.params.voidRecord.getUrineVolume().valueOf() // FIXME: -1
    );
    const id = route.params.voidRecord.getId();

    const navigateToRecordScreen = useCallback(() => {
      navigation.navigate('App', { screen: 'Record' });
    }, [navigation]);

    const updateRecord = async () => {
      const r = new VoidRecord(dateAndTime, new VolumeInOz(volume));
      await updateRecordAction.execute(id, r);
      recordsStaleObservable.notifySubscribers();
      navigateToRecordScreen();
    };

    const goBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

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
          <Text style={styles.title}>Edit Void Record</Text>
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
          <View style={styles.buttonGroup}>
            <Button
              title="Back"
              onPress={goBack}
              backgroundColor={theme.colors.gray}
              style={styles.button}
            />
            <Button
              title="Confirm"
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
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spaces.sm,
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
