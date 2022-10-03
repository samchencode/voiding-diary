import { EjsReportFormatter } from '@/infrastructure/report-formatter/ejs/EjsReportFormatter';
import { getTemplates } from '@/infrastructure/report-formatter/ejs/getTemplates';

export function ejsReportFormatterFactory() {
  return new EjsReportFormatter(getTemplates);
}
