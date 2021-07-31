import React from 'react';
import App from './App';
import ThemeContext, { defaultTheme } from '../features/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

export default () => (
  <ThemeContext.Provider value={defaultTheme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ThemeContext.Provider>
);
