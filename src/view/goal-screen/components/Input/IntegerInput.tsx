import React, { useContext, useEffect, useRef, useState } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import {
  padZero,
  resolveFieldValue,
  validateIntegerString,
  valueToString,
} from '@/view/goal-screen/components/Input/util';
import { FocusContext } from '@/view/goal-screen/components/Input/FocusContext';

type NumericInputProps = {
  style: StyleProp<ViewStyle>;
  placeholder: string;
  maxDigits: number;
  value?: number;
  shouldPadZeroes?: boolean;
  onChangeNumber: (n: number) => void;
};

function IntegerInput({
  style,
  placeholder,
  maxDigits,
  value,
  shouldPadZeroes = false,
  onChangeNumber,
}: NumericInputProps) {
  const initialFieldValue =
    typeof value !== 'undefined'
      ? valueToString(shouldPadZeroes, maxDigits, value)
      : '';
  const [fieldValue, setFieldValue] = useState(initialFieldValue);
  const validateAndRunCallback = (text: string) => {
    if (text === '') return setFieldValue('');
    if (!validateIntegerString(text)) return undefined;
    onChangeNumber(Number.parseInt(text, 10));
    setFieldValue(text);
    return undefined;
  };

  const { hasFocus, setHasFocus } = useContext(FocusContext);

  const handleBlur = () => {
    if (fieldValue === '') {
      onChangeNumber(0);
    } else if (shouldPadZeroes && fieldValue.length < maxDigits) {
      setFieldValue(padZero(fieldValue, maxDigits));
    }
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const input = useRef<TextInput>(null);

  useEffect(() => {
    if (!hasFocus && input.current) {
      input.current.blur();
    }
  }, [hasFocus]);

  return (
    <TextInput
      keyboardType="numeric"
      style={[styles.input, style]}
      placeholder={placeholder}
      value={resolveFieldValue(shouldPadZeroes, maxDigits, fieldValue, value)}
      onChangeText={validateAndRunCallback}
      onBlur={handleBlur}
      onFocus={handleFocus}
      maxLength={maxDigits}
      ref={input}
    />
  );
}

IntegerInput.defaultProps = {
  value: undefined,
  shouldPadZeroes: false,
};

const styles = StyleSheet.create({
  input: {
    ...theme.fonts.mdBold,
    textAlign: 'center',
  },
});

export { IntegerInput };
