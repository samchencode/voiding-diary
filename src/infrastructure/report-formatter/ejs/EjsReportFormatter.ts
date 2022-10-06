import ejs from 'ejs';
import type { ReportFormatter } from '@/application/ports/ReportFormatter';
import type { Report } from '@/domain/models/Report';
import type { Record } from '@/domain/models/Record';
import { EjsRecordVisitor } from '@/infrastructure/report-formatter/ejs/EjsRecordVisitor';
import type { FileSystem } from '@/application/ports/FileSystem';

class EjsReportFormatter implements ReportFormatter {
  layoutTemplate: ejs.TemplateFunction | null = null;

  rowTemplate: ejs.TemplateFunction | null = null;

  fileSystem: FileSystem;

  constructor(fileSystem: FileSystem) {
    this.fileSystem = fileSystem;
  }

  private async init() {
    const layoutEjs = await this.fileSystem.getAssetAsString(
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      require('@/infrastructure/report-formatter/ejs/templates/layout.ejs')
    );
    const rowEjs = await this.fileSystem.getAssetAsString(
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      require('@/infrastructure/report-formatter/ejs/templates/row.ejs')
    );
    this.layoutTemplate = ejs.compile(layoutEjs);
    this.rowTemplate = ejs.compile(rowEjs);
  }

  async format(report: Report): Promise<string> {
    if (this.layoutTemplate === null) await this.init();
    this.layoutTemplate = this.layoutTemplate as ejs.TemplateFunction;
    return this.layoutTemplate({
      report,
      formatRecord: this.formatRecord.bind(this),
    });
  }

  private formatRecord(r: Record) {
    if (!this.rowTemplate)
      throw new Error('EjsReportFormatter.formatRecord used before init');
    const visitor = new EjsRecordVisitor(this.rowTemplate, r);
    return visitor.getOutput();
  }
}

export { EjsReportFormatter };
