import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VolumeInputGroup } from '@/view/components';
import type { Record } from '@/domain/models/Record';
import { VoidRecord } from '@/domain/models/Record';
import { theme } from '@/view/theme';
import type { Volume } from '@/domain/models/Volume';
import { DateTimePicker } from '@/view/edit-record-modal/components/DateTimePicker';
import type { DateAndTime } from '@/domain/models/DateAndTime';

type VoidRecordInputGroupProps = {
  voidRecord: VoidRecord;
  onChangeRecord: (r: Record) => void;
};

function VoidRecordInputGroup({
  voidRecord,
  onChangeRecord,
}: VoidRecordInputGroupProps) {
  const volume = useMemo(() => voidRecord.getUrineVolume(), [voidRecord]);

  const handleChangeVolume = useCallback(
    (v: Volume) => {
      const dateAndTime = voidRecord.getDateAndTime();
      onChangeRecord(new VoidRecord(dateAndTime, v));
    },
    [voidRecord, onChangeRecord]
  );

  const dateAndTime = useMemo(() => voidRecord.getDateAndTime(), [voidRecord]);
  const handleChangeDateAndTime = useCallback(
    (d: DateAndTime) => {
      const v = voidRecord.getUrineVolume();
      onChangeRecord(new VoidRecord(d, v));
    },
    [voidRecord, onChangeRecord]
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

export { VoidRecordInputGroup };
