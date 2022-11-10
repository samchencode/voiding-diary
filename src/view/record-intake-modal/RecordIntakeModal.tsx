import type { Record } from '@/domain/models/Record';
import { IntakeRecord } from '@/domain/models/Record';
import type { SaveRecordAction } from '@/application/SaveRecordAction';
import React, { useState, useCallback } from 'react';
import { Card, Button } from '@/view/components';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { DateAndTime } from '@/domain/models/DateAndTime';
import type { Volume } from '@/domain/models/Volume';
import { UnknownVolume } from '@/domain/models/Volume';
import type { Observable } from '@/view/observables';

import { StatusBar } from '@/view/status-bar';
import { VolumeInputGroup } from '@/view/components/VolumeInputGroup';

type RecordIntakeModalProps = RootNavigationProps<'RecordIntakeModal'>;

function factory(
  saveRecordAction: SaveRecordAction,
  recordsStaleObservable: Observable
) {
  async function handleNewRecord(record: Record) {
    await saveRecordAction.execute(record);
    recordsStaleObservable.notifySubscribers();
  }

  const makeIntake = (volume: Volume) => {
    const datetime = new DateAndTime(new Date());
    return new IntakeRecord(datetime, volume);
  };

  return function RecordIntakeModal({ navigation }: RecordIntakeModalProps) {
    const [beverage, setBeverage] = useState('');
    const [volume, setVolume] = useState<Volume>(new UnknownVolume());

    const goBack = useCallback(() => navigation.goBack(), [navigation]);
    const submit = useCallback(() => {
      handleNewRecord(makeIntake(volume));
      navigation.navigate('Home');
    }, [navigation, volume]);

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
          <Text style={styles.title}>+Intake</Text>
          <Text style={styles.subTitle}>Beverage</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Water"
            onChangeText={(newText) => setBeverage(newText)}
            defaultValue={beverage}
          />
          <Text style={styles.subTitle}>Size</Text>
          <VolumeInputGroup
            style={styles.volumeInputGroup}
            value={volume}
            onChangeValue={setVolume}
          />
          <View style={styles.buttonGroup}>
            <Button
              onPress={goBack}
              title="Back"
              backgroundColor={theme.colors.gray}
              style={styles.button}
            />
            <Button
              onPress={submit}
              title="Add"
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
    width: 363,
    margin: theme.spaces.lg,
    marginTop: 0,
    elevation: 5,
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginTop: -6,
  },
  subTitle: {
    ...theme.fonts.sm,
  },
  textInput: {
    height: 40,
    ...theme.fonts.sm,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  volumeInputGroup: {
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
