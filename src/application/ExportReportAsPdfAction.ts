import type { PdfExporter } from '@/application/ports/Exporter';
import type { ReportFormatter } from '@/application/ports/ReportFormatter';
import type { Report } from '@/domain/models/Report';

class ExportReportAsPdfAction {
  constructor(
    private htmlReportFormatter: ReportFormatter,
    private pdfExporter: PdfExporter
  ) {}

  async execute(report: Report) {
    const html = await this.htmlReportFormatter.format(report);
    this.pdfExporter.configure(html);
    await this.pdfExporter.export();
  }
}

export { ExportReportAsPdfAction };
