import type { ExportReportAsPdfAction } from '@/application/ExportReportAsPdfAction';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { makeReport } from '@/domain/services/makeReport';

class ExportReportOfAllRecordsAsPdfAction {
  constructor(
    private exportReportAsPdfAction: ExportReportAsPdfAction,
    private recordRepository: RecordRepository
  ) {}

  async execute() {
    const records = await this.recordRepository.getAll();
    const report = makeReport(records);
    await this.exportReportAsPdfAction.execute(report);
  }
}

export { ExportReportOfAllRecordsAsPdfAction };
