import React from 'react';
import App from './App';
import ThemeContext, { defaultTheme } from '../features/theme';

export default () => (
  <ThemeContext.Provider value={defaultTheme}>
    <App />
  </ThemeContext.Provider>
);
