import React from 'react';
import type {
  IntakeRecord,
  RecordVisitor,
  VoidRecord,
  Record,
} from '@/domain/models/Record';
import {
  IntakeRecordRow,
  VoidRecordRow,
} from '@/view/record-screen/components/RecordRow';

function makeKey(r: Record) {
  return Object.values(r.serialize()).join(',');
}

class ViewRecordVisitor implements RecordVisitor {
  recordRows: [JSX.Element, string][];

  constructor() {
    this.recordRows = [];
  }

  visitIntakeRecord(r: IntakeRecord): void {
    const key = makeKey(r);
    this.recordRows.push([
      <IntakeRecordRow
        volume={r.getIntakeVolumeString()}
        time={r.getTimeString()}
        key={key}
      />,
      key,
    ]);
  }

  visitVoidRecord(r: VoidRecord): void {
    const key = makeKey(r);
    this.recordRows.push([
      <VoidRecordRow
        volume={r.getUrineVolumeString()}
        time={r.getTimeString()}
        key={key}
      />,
      key,
    ]);
  }

  getRecordRows() {
    return this.recordRows;
  }
}

export { ViewRecordVisitor };
