const colors = {
  dark: '#454549',
  light: '#FEFBFE',
  lightGray: '#EEEEEE',
  gray: '#818188',
  success: '#A9EBA9',
  danger: '#A73A5D',
  bg: '#E2E9F3',
  primary: '#5074B1',
  accent: '#5CC2EA',
  get surface() {
    return this.light;
  },
};

const fonts = {
  lg: {
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
  },
  md: {
    fontSize: 24,
    fontFamily: 'Roboto_300Light',
  },
  mdBold: {
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
  },
  sm: {
    fontSize: 18,
    fontFamily: 'Roboto_300Light',
  },
  smBold: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
  },
  xs: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  menu: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
};

const spaces = {
  xl: 24,
  lg: 16,
  sm: 8,
  xs: 4,
};

const br = 16;

export const theme = {
  spaces,
  br,
  fonts,
  colors,
};
