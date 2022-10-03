import type { Exporter } from '@/application/ports/Exporter';
import type { ReportFormatter } from '@/application/ports/ReportFormatter';
import type { Report } from '@/domain/models/Report/Report';

class ExportReportAction {
  // eslint-disable-next-line class-methods-use-this
  async execute(
    report: Report,
    reportFormatter: ReportFormatter,
    exporter: Exporter
  ) {
    const formatted = await reportFormatter.format(report);
    await exporter.export(formatted);
  }
}

export { ExportReportAction };
