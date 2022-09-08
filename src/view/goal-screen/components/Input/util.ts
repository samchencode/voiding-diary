const validateIntegerString = (s: string) => /^[0-9]+$/.test(s);

const padZero = (s: string, totalLength: number): string =>
  totalLength - s.length > 0 ? padZero(`0${s}`, totalLength) : s;

const valueToString = (
  shouldPadZeroes: boolean,
  maxDigits: number,
  value: number
) =>
  shouldPadZeroes ? padZero(value.toString(), maxDigits) : value.toString();

const resolveFieldValue = (
  shouldPadZeroes: boolean,
  maxDigits: number,
  internalFieldValue: string,
  propsValue: number | undefined
) => {
  const fieldEmpty = internalFieldValue.length === 0;
  if (fieldEmpty) return '';

  if (typeof propsValue === 'undefined') return internalFieldValue;

  const paddedPropsValueString = valueToString(
    shouldPadZeroes,
    maxDigits,
    propsValue
  );
  const paddedInternalFieldValue = shouldPadZeroes
    ? padZero(internalFieldValue, maxDigits)
    : internalFieldValue;
  if (paddedPropsValueString === paddedInternalFieldValue)
    return internalFieldValue;
  return paddedPropsValueString;
};

export { validateIntegerString, valueToString, resolveFieldValue, padZero };
