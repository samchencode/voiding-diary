import ejs from 'ejs';
import type { ReportFormatter } from '@/application/ports/ReportFormatter';
import type { Report } from '@/domain/models/Report/Report';
import type { Record } from '@/domain/models/Record';
import { EjsRecordVisitor } from '@/infrastructure/report-formatter/ejs/EjsRecordVisitor';

type TemplateFiles = 'layout' | 'row';

type Templates = {
  [key in TemplateFiles]: string;
};

class EjsReportFormatter implements ReportFormatter {
  layoutTemplate: ejs.TemplateFunction | null = null;

  rowTemplate: ejs.TemplateFunction | null = null;

  getTemplates: () => Promise<Templates>;

  constructor(getTemplates: () => Promise<Templates>) {
    this.getTemplates = getTemplates;
  }

  private async init() {
    const templates = await this.getTemplates();
    this.layoutTemplate = ejs.compile(templates.layout);
    this.rowTemplate = ejs.compile(templates.row);
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
export type { Templates, TemplateFiles };
