import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';

type NumericInputProps = {
  style: StyleProp<ViewStyle>;
  placeholder: string;
};

function NumericInput({ style, placeholder }: NumericInputProps) {
  return (
    <TextInput
      keyboardType="numeric"
      style={[styles.input, style]}
      placeholder={placeholder}
    />
  );
}

function TimeInput() {
  return (
    <View style={styles.inputContainer}>
      <NumericInput style={styles.timeInputField} placeholder="hh" />
      <Text style={[styles.input, styles.timeInputColon]}>:</Text>
      <NumericInput style={styles.timeInputField} placeholder="mm" />
    </View>
  );
}

function IntakeInput() {
  return (
    <View style={styles.inputContainer}>
      <NumericInput style={styles.intakeInputField} placeholder="32" />
      <Text style={styles.intakeUnits}> oz</Text>
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
  intakeInputField: {
    flex: 1,
  },
  intakeUnits: {
    ...theme.fonts.mdBold,
  },
});

export { TimeInput, IntakeInput };
