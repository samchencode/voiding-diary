import { createSelector } from '@reduxjs/toolkit';
import { utils } from '../common';

const { formatDate } = utils.date;

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

export const selectTodaysTotalIntake = createSelector(
  selectLogs,
  selectDays,
  (logs, days) => {
    const today = formatDate(new Date());
    const logIds = days.entities[today]?.logs;
    if (!logIds) return 0;

    const logEntities = logIds.map((id) => logs.entities[id]);
    const intakeVolumes = logEntities.map((log) => log.volume);
    return intakeVolumes.reduce((a, b) => a + b, 0);
  }
);

export const selectLastThreeLogs = createSelector(selectLogs, (logs) =>
  logs.ids.slice(-3).map((id) => logs.entities[id])
);
