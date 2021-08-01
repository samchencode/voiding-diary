import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { utils } from '../common';
const { formatDate, parseIso } = utils.date;

const initialState = {
  logs: {
    entities: {
      0: {
        type: 'intake',
        datetime: '2021-07-01T11:30:22.000Z',
        label: 'Wine - Soave Folonari',
        volume: 53,
        id: 0,
      },
    },
    ids: [0],
  },
  days: {
    entities: {
      '07-01-2021': {
        id: '07-01-2021',
        logs: [0],
      },
    },
    ids: ['07-01-2021'],
  },
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    add(state, { payload: { type, datetime, volume, label = null } }) {
      const id = state.logs.ids.length;
      state.logs.entities[id] = { id, type, datetime, volume, label };
      state.logs.ids.push(id);

      const date = formatDate(parseIso(datetime));
      if (!state.days.entities[date]) {
        state.days.entities[date] = { id: date, logs: [] };
        state.days.ids.push(date);
      }
      state.days.entities[date].logs.push(id);
    },
    edit(
      state,
      { payload: { id, datetime = null, volume = null, label = null } }
    ) {
      const edits = {
        ...(datetime && { datetime }),
        ...(volume && { volume }),
        ...(label && { label }),
      };
      Object.assign(state.logs.entities[id], edits);
    },
    remove(state, { payload: { id } }) {
      const { datetime } = state.logs.entities[id];
      const date = formatDate(parseIso(datetime));
      console.log('ff', datetime, date);
      state.days.entities[date].logs = state.days.entities[date].logs.filter(
        (x) => x !== id
      );
      delete state.logs.entities[id];
      state.logs.ids.splice(id, 1);
    },
    // TODO: load
  },
});

export const { add, edit, remove } = historySlice.actions;
export default historySlice.reducer;
