import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { IntegerInput } from '@/view/goal-screen/components/Input/IntegerInput';

function TimeInput() {
  return (
    <View style={styles.inputContainer}>
      <IntegerInput
        style={styles.timeInputField}
        placeholder="hh"
        maxDigits={2}
        shouldPadZeroes
        onChangeNumber={() => {}}
      />
      <Text style={[styles.input, styles.timeInputColon]}>:</Text>
      <IntegerInput
        style={styles.timeInputField}
        placeholder="mm"
        maxDigits={2}
        shouldPadZeroes
        onChangeNumber={() => {}}
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
