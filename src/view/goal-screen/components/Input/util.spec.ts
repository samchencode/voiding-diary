import {
  areSameValue,
  padZero,
  resolveFieldValue,
  validateIntegerString,
  valueToString,
} from '@/view/goal-screen/components/Input/util';

describe('@/view/goal-screen/components/Input/util', () => {
  describe('validateIntegerString', () => {
    it('should return false for non-integers and invalid numbers', () => {
      expect(validateIntegerString('foo')).toBe(false);
      expect(validateIntegerString('1.1')).toBe(false);
      expect(validateIntegerString('1-1')).toBe(false);
      expect(validateIntegerString('1/1')).toBe(false);
      expect(validateIntegerString('0x1')).toBe(false);
      expect(validateIntegerString('1x0')).toBe(false);
      expect(validateIntegerString('1')).toBe(true);
    });
  });

  describe('padZero', () => {
    it('should pad zeroes to make string desired length', () => {
      expect(padZero('4', 4)).toBe('0004');
      expect(padZero('1', 2)).toBe('01');
      expect(padZero('', 2)).toBe('00');
    });
  });

  describe('valueToString', () => {
    it('should pad zeroes to make number desired length', () => {
      const toString = valueToString.bind(null, true);
      expect(toString(4, 4)).toBe('0004');
      expect(toString(2, 1)).toBe('01');
    });
  });

  describe('resolveFieldValue', () => {
    it('should pick correct value when padding zeroes', () => {
      const resolve = resolveFieldValue.bind(null, true, 2);
      expect(resolve('11', 11)).toBe('11');
      expect(resolve('1', 1)).toBe('1'); // pad onBlur later
      expect(resolve('', 0)).toBe('');
      expect(resolve('', 1)).toBe('');
      expect(resolve('', undefined)).toBe('');
      expect(resolve('1', undefined)).toBe('1');
      expect(resolve('1', 0)).toBe('00');
      expect(resolve('01', 1)).toBe('01');
    });
  });

  describe('areSameValue', () => {
    const compare = areSameValue.bind(null, true, 2);
    expect(compare('11', 11)).toBe(true);
    expect(compare('1', 1)).toBe(true);
    expect(compare('01', 1)).toBe(true);
    expect(compare('0', 0)).toBe(true);
    expect(compare('', 0)).toBe(false);
    expect(compare('', 1)).toBe(false);
    expect(compare('1', 0)).toBe(false);
    expect(compare('2', 1)).toBe(false);
  });
});
