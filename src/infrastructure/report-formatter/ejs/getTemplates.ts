/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import type { Templates } from '@/infrastructure/report-formatter/ejs/EjsReportFormatter';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

async function getTemplates(): Promise<Templates> {
  const layout = await Asset.fromModule(
    require('./templates/layout.ejs')
  ).downloadAsync();
  const row = await Asset.fromModule(
    require('./templates/row.ejs')
  ).downloadAsync();

  return {
    layout: await FileSystem.readAsStringAsync(layout.localUri as string),
    row: await FileSystem.readAsStringAsync(row.localUri as string),
  };
}

export { getTemplates };
