import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { baseTheme } from '../theme';

function TimeInput() {
  return (
    <View style={styles.timeInput}>
      <TextInput
        style={[styles.input, styles.timeInputField]}
        keyboardType="numeric"
        placeholder="hh"
      />
      <Text style={[styles.input, styles.timeInputColon]}>:</Text>
      <TextInput
        style={[styles.input, styles.timeInputField]}
        keyboardType="numeric"
        placeholder="mm"
      />
    </View>
  );
}

function IntakeInput() {
  return (
    <TextInput
      style={[styles.input, styles.intakeInputField]}
      keyboardType="numeric"
      placeholder="32oz"
    />
  );
}

const { fonts } = baseTheme;

const styles = StyleSheet.create({
  input: {
    ...fonts.mdBold,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center',
  },
  timeInput: {
    display: 'flex',
    flexDirection: 'row',
  },
  timeInputField: {
    width: 45,
  },
  timeInputColon: {
    width: 10,
    textAlign: 'center',
  },
  intakeInputField: {
    width: 100,
  },
});

export { TimeInput, IntakeInput };
