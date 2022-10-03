import type ejs from 'ejs';
import type {
  IntakeRecord,
  Record,
  RecordVisitor,
  VoidRecord,
} from '@/domain/models/Record';

class EjsRecordVisitor implements RecordVisitor {
  private template: ejs.TemplateFunction;

  private output: string | null = '';

  constructor(template: ejs.TemplateFunction, record: Record) {
    this.template = template;
    record.acceptVisitor(this);
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.output = this.template({
      title: 'Intake',
      volume: r.getIntakeVolumeString(),
      date: r.getDateString(),
      time: r.getTimeString(),
    });
  }

  visitVoidRecord(r: VoidRecord): void {
    this.output = this.template({
      title: 'Void',
      volume: r.getUrineVolumeString(),
      date: r.getDateString(),
      time: r.getTimeString(),
    });
  }

  getOutput() {
    return this.output;
  }
}

export { EjsRecordVisitor };
