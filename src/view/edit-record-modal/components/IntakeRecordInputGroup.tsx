import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VolumeInputGroup } from '@/view/components';
import type { Record } from '@/domain/models/Record';
import { IntakeRecord } from '@/domain/models/Record';
import { theme } from '@/view/theme';
import type { Volume } from '@/domain/models/Volume';
import { DateTimePicker } from '@/view/edit-record-modal/components/DateTimePicker';
import type { DateAndTime } from '@/domain/models/DateAndTime';

type IntakeRecordInputGroupProps = {
  intakeRecord: IntakeRecord;
  onChangeRecord: (r: Record) => void;
};

function IntakeRecordInputGroup({
  intakeRecord,
  onChangeRecord,
}: IntakeRecordInputGroupProps) {
  const volume = useMemo(() => intakeRecord.getIntakeVolume(), [intakeRecord]);

  const handleChangeVolume = useCallback(
    (v: Volume) => {
      const dateAndTime = intakeRecord.getDateAndTime();
      onChangeRecord(new IntakeRecord(dateAndTime, v));
    },
    [intakeRecord, onChangeRecord]
  );

  const dateAndTime = useMemo(
    () => intakeRecord.getDateAndTime(),
    [intakeRecord]
  );
  const handleChangeDateAndTime = useCallback(
    (d: DateAndTime) => {
      const v = intakeRecord.getIntakeVolume();
      onChangeRecord(new IntakeRecord(d, v));
    },
    [intakeRecord, onChangeRecord]
  );

  return (
    <>
      <View style={styles.field}>
        <Text style={styles.subtitle}>Size</Text>
        <VolumeInputGroup
          value={volume}
          style={styles.volumeInputGroup}
          onChangeValue={handleChangeVolume}
        />
      </View>
      <DateTimePicker
        value={dateAndTime}
        onChangeValue={handleChangeDateAndTime}
        style={styles.field}
      />
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: theme.spaces.lg,
  },
  volumeInputGroup: {},
  subtitle: {
    ...theme.fonts.sm,
  },
});

export { IntakeRecordInputGroup };
