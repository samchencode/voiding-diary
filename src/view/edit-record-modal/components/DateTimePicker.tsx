import React, { useCallback, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { theme } from '@/view/theme';

type DateTimePickerProps = {
  value: DateAndTime;
  onChangeValue: (v: DateAndTime) => void;
  style?: StyleProp<ViewStyle>;
};

function DateTimePicker({ value, onChangeValue, style }: DateTimePickerProps) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleChangeValue = useCallback(
    (date: Date) => {
      const dateAndTime = new DateAndTime(date);
      onChangeValue(dateAndTime);
      setDatePickerVisible(false);
    },
    [onChangeValue]
  );

  return (
    <>
      <View style={[styles.container, style]}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          onPress={useCallback(() => setDatePickerVisible(true), [])}
        >
          <Text style={styles.field}>
            <Text>{value.getDateString()} </Text>
            <Text>{value.getTimeString()} </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="datetime"
        date={value.getDate()}
        onConfirm={handleChangeValue}
        onCancel={useCallback(() => setDatePickerVisible(false), [])}
      />
    </>
  );
}

DateTimePicker.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  container: {},
  label: {
    ...theme.fonts.sm,
  },
  field: {
    color: theme.colors.accent,
    ...theme.fonts.sm,
  },
});

export { DateTimePicker };
