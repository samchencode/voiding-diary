const validateIntegerString = (s: string) => /^[0-9]+$/.test(s);

const padZero = (s: string, totalLength: number): string =>
  totalLength - s.length > 0 ? padZero(`0${s}`, totalLength) : s;

const valueToString = (
  shouldPadZeroes: boolean,
  maxDigits: number,
  value: number
) =>
  shouldPadZeroes ? padZero(value.toString(), maxDigits) : value.toString();

const areSameValue = (
  shouldPadZeroes: boolean,
  maxDigits: number,
  internalFieldValue: string,
  propsValue: number
) => {
  if (internalFieldValue === '') return false;
  const paddedPropsValueString = valueToString(
    shouldPadZeroes,
    maxDigits,
    propsValue
  );
  const paddedInternalFieldValue = shouldPadZeroes
    ? padZero(internalFieldValue, maxDigits)
    : internalFieldValue;

  return paddedPropsValueString === paddedInternalFieldValue;
};

const resolveFieldValue = (
  shouldPadZeroes: boolean,
  maxDigits: number,
  internalFieldValue: string,
  propsValue: number | undefined
) => {
  const fieldEmpty = internalFieldValue.length === 0;
  if (fieldEmpty) return '';

  if (typeof propsValue === 'undefined') return internalFieldValue;

  const valuesEquivalent = areSameValue(
    shouldPadZeroes,
    maxDigits,
    internalFieldValue,
    propsValue
  );
  if (valuesEquivalent) return internalFieldValue;
  return valueToString(shouldPadZeroes, maxDigits, propsValue);
};

export {
  validateIntegerString,
  valueToString,
  resolveFieldValue,
  padZero,
  areSameValue,
};
