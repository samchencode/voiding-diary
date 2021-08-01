import { createSelector } from '@reduxjs/toolkit';

export const selectLogs = (state) => state.history.logs;
export const selectDays = (state) => state.history.days;

export const selectSectionListData = createSelector(
  selectLogs,
  selectDays,
  (logs, days) =>
    Object.values(days.entities).map((d) => {
      const sectionData = d.logs.map((l) => logs.entities[l]);
      return {
        id: d.id,
        data: sectionData,
      };
    })
);
