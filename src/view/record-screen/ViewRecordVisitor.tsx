import React from 'react';
import type {
  IntakeRecord,
  RecordVisitor,
  VoidRecord,
  Record,
} from '@/domain/models/Record';
import { IntakeRecordRow } from '@/view/record-screen/components';

function makeKey(r: Record) {
  return Object.values(r.serialize()).join(',');
}

class ViewRecordVisitor implements RecordVisitor {
  private rowElement?: JSX.Element;

  private key?: string;

  constructor(r: Record) {
    r.acceptVisitor(this);
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.key = makeKey(r);
    this.rowElement = (
      <IntakeRecordRow
        key={this.key}
        volume={r.getIntakeVolumeString()}
        time={r.getTimeString()}
      />
    );
  }

  visitVoidRecord(r: VoidRecord): void {
    this.key = makeKey(r);
    this.rowElement = (
      <IntakeRecordRow
        key={this.key}
        volume={r.getUrineVolumeString()}
        time={r.getTimeString()}
      />
    );
  }

  getElement() {
    if (!this.rowElement) throw Error();
    return this.rowElement;
  }

  getKey() {
    if (!this.key) throw Error();
    return this.key;
  }

  getElementAndKey() {
    return {
      element: this.getElement(),
      key: this.getKey(),
    };
  }
}

export { ViewRecordVisitor };
