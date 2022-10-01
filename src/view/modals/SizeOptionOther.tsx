import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/view/theme';

type SizeOptionOtherProps = {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

function SizeOptionOther({ setSize, size }: SizeOptionOtherProps) {
  const [validSize, setValidSize] = useState(true);
  function isValidSize(value: string) {
    if (!Number.isNaN(Number(value)) && value.length < 5) {
      return true;
    }
    return false;
  }
  return (
    <View style={styles.otherSizeOption}>
      <TextInput
        style={validSize ? styles.validSize : styles.invalidSize}
        onChangeText={(newText) => {
          if (isValidSize(newText)) {
            setValidSize(true);
            setSize(Number(newText));
            return size.toString();
          }
          setValidSize(false);
          return size.toString();
        }}
        defaultValue={size.toString()}
        value={size.toString()}
      />
      <Text style={validSize ? styles.validSize : styles.invalidSize}> oz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  otherSizeOption: {
    ...theme.fonts.md,
    color: theme.colors.accent,
    padding: theme.spaces.lg,
    flexDirection: 'row',
  },
  validSize: {
    color: theme.colors.accent,
    ...theme.fonts.md,
  },
  invalidSize: {
    color: theme.colors.danger,
    ...theme.fonts.md,
  },
});

export { SizeOptionOther };
