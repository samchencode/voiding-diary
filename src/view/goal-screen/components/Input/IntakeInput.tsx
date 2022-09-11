import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { IntegerInput } from '@/view/goal-screen/components/Input/IntegerInput';

type IntakeTypeProps = {
  value: number | undefined;
  onChangeNumber: (n: number) => void;
};

function IntakeInput({ value, onChangeNumber }: IntakeTypeProps) {
  return (
    <View style={styles.inputContainer}>
      <IntegerInput
        value={value}
        style={styles.intakeInputField}
        placeholder="32"
        maxDigits={4}
        onChangeNumber={onChangeNumber}
      />
      <Text style={styles.intakeUnits}> oz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 100,
  },
  intakeInputField: {
    flex: 1,
  },
  intakeUnits: {
    ...theme.fonts.mdBold,
  },
});

export { IntakeInput };
