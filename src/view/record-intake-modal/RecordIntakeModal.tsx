import type { Record } from '@/domain/models/Record';
import { IntakeRecord } from '@/domain/models/Record';
import type { SaveRecordAction } from '@/application/SaveRecordAction';
import React, { useState } from 'react';
import { SizeOption, SizeOptionOther, Card, Button } from '@/view/components';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { VolumeInOz } from '@/domain/models/Volume';
import type { Observable } from '@/view/observables';

type RecordIntakeModalProps = RootNavigationProps<'RecordIntakeModal'>;

function factory(
  saveRecordAction: SaveRecordAction,
  recordsStaleObservable: Observable
) {
  async function handleNewRecord(record: Record) {
    await saveRecordAction.execute(record);
    recordsStaleObservable.notifySubscribers();
  }

  const makeIntake = (amount: number) => {
    const datetime = new DateAndTime(new Date());
    const volume = new VolumeInOz(amount);
    return new IntakeRecord(datetime, volume);
  };

  return function RecordIntakeModal({ navigation }: RecordIntakeModalProps) {
    const [beverage, setBeverage] = useState('');
    const [size, setSize] = useState(0);

    function submitIntakeRecord(amount: number) {
      handleNewRecord(makeIntake(amount));

      navigation.navigate('Home');
    }

    return (
      <View style={styles.container}>
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
          <View style={styles.rowOfSizes}>
            <SizeOption title="8oz" size={8} setSize={setSize} />
            <SizeOption title="10oz" size={10} setSize={setSize} />
            <SizeOption title="16oz" size={16} setSize={setSize} />
            <SizeOptionOther setSize={setSize} size={size} />
          </View>
          <Button
            onPress={() => {
              submitIntakeRecord(size);
            }}
            title="Add"
          />
        </Card>
      </View>
    );
  };
}

const styles = StyleSheet.create({
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
  rowOfSizes: {
    display: 'flex',
    flexDirection: 'row',
    ...theme.fonts.sm,
    marginBottom: theme.spaces.sm,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
