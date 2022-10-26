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

  function onChangeText(newText:string){if (isValidSize(newText)) {
    setValidSize(true);
    setSize(Number(newText));
    return size.toString();
  }
  setValidSize(false);
  return size.toString();}

  function makeValue(){
    if(size===0) return undefined
    return size.toString()
  }

  return (
    <View style={styles.otherSizeOption}>
      <TextInput
        style={validSize ? styles.validSize : styles.invalidSize}
        onChangeText={(newText) => {onChangeText(newText)}}
        keyboardType="numeric"
        maxLength={4}
        value = {makeValue()}
        placeholder = '00'
      />
      <Text style={validSize ? styles.validSize : styles.invalidSize}> oz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  otherSizeOption: {
    ...theme.fonts.md,
    color: theme.colors.accent,
    flexDirection: 'row',
    paddingRight: theme.spaces.sm,
  },
  validSize: {
    color: theme.colors.accent,
    borderBottomWidth: 1,
    ...theme.fonts.md,
  },
  invalidSize: {
    color: theme.colors.danger,
    borderBottomWidth: 1,
    ...theme.fonts.md,
  },
});

export { SizeOptionOther };
