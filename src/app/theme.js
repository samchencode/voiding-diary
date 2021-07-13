import { DefaultTheme } from 'react-native-paper';

const palatte = {
  // Custom
  dark: '#454549',
  light: '#FEFBFE',
  gray: '#818188',
  success: '#A9EBA9',
  danger: '#A73A5D',
  bg: '#E2E9F3',

  // Override
  primary: '#5074B1',
  accent: '#5CC2EA',
};

// Docs: https://callstack.github.io/react-native-paper/theming.html
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...palatte,
    text: palatte.dark,
    surface: palatte.light,
  },
};
