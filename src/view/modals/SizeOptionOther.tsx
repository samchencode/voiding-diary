import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
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
    <TextInput
      style={[
        styles.otherSizeOption,
        validSize ? styles.validSize : styles.invalidSize,
      ]}
      // placeholder="other"
      onChangeText={(newText) => {
        if (isValidSize(newText)) {
          setValidSize(true);
          setSize(Number(newText));
          return Number(newText);
        }
        setValidSize(false);
        // bug - stops the first invalid entry but alows subsequent invalid entries, instead of size.toString() which remains unchanged.
        return size.toString();
      }}
      defaultValue={size.toString()}
    />
  );
}

const styles = StyleSheet.create({
  otherSizeOption: {
    ...theme.fonts.md,
    color: theme.colors.accent,
    padding: theme.spaces.lg,
  },
  validSize: {
    color: theme.colors.accent,
  },
  invalidSize: {
    color: theme.colors.danger,
  },
});

export { SizeOptionOther };
