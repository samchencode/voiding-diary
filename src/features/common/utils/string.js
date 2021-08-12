export const trimWithEllipsis = (str, maxLength) =>
  str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;

export const isNumber = (str) => !Number.isNaN(+str);
