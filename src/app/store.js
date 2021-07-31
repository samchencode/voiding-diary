import { configureStore } from '@reduxjs/toolkit';
import historyReducer from '../features/history';

const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});

export default store;
