import type {
  IntakeRecord,
  RecordVisitor,
  VoidRecord,
  Record,
} from '@/domain/models/Record';

type RowFactory<T extends Record> = (r: T) => JSX.Element;

type RowFactories = {
  makeIntakeRecordRow: RowFactory<IntakeRecord>;
  makeVoidRecordRow: RowFactory<VoidRecord>;
};

class RowRecordVisitor implements RecordVisitor {
  private rowElement?: JSX.Element;

  private factories: RowFactories;

  constructor(r: Record, factories: RowFactories) {
    this.factories = factories;
    r.acceptVisitor(this);
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.rowElement = this.factories.makeIntakeRecordRow(r);
  }

  visitVoidRecord(r: VoidRecord): void {
    this.rowElement = this.factories.makeVoidRecordRow(r);
  }

  getElement() {
    if (!this.rowElement) throw Error();
    return this.rowElement;
  }
}

export { RowRecordVisitor };
