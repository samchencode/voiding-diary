import type { Report } from '@/domain/models/Report/Report';

interface ReportFormatter {
  format(report: Report): Promise<string>;
}

export type { ReportFormatter };
