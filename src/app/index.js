import React from 'react';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

export default () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);
