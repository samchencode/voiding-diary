import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { IntegerInput } from '@/view/goal-screen/components/Input/IntegerInput';

type HhSs = [number | undefined, number | undefined];

type TimeInputProps = {
  value: HhSs;
  onChangeValue: (v: HhSs) => void;
};

const MAX_MINS = 59;

function TimeInput({ value, onChangeValue }: TimeInputProps) {
  const handleChangeHh = (n: number) => onChangeValue([n, value[1]]);
  const handleChangeSs = (n: number) =>
    onChangeValue([value[0], Math.min(n, MAX_MINS)]);

  return (
    <View style={styles.inputContainer}>
      <IntegerInput
        value={value[0]}
        style={styles.timeInputField}
        placeholder="hh"
        maxDigits={2}
        shouldPadZeroes
        onChangeNumber={handleChangeHh}
      />
      <Text style={[styles.input, styles.timeInputColon]}>:</Text>
      <IntegerInput
        value={value[1]}
        style={styles.timeInputField}
        placeholder="mm"
        maxDigits={2}
        shouldPadZeroes
        onChangeNumber={handleChangeSs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    ...theme.fonts.mdBold,
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 100,
  },
  timeInputField: {
    width: 45,
  },
  timeInputColon: {
    width: 10,
    textAlign: 'center',
  },
});

export { TimeInput };
