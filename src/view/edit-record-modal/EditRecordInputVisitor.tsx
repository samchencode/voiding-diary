import React from 'react';
import type {
  IntakeRecord,
  Record,
  RecordVisitor,
  VoidRecord,
} from '@/domain/models/Record';
import {
  IntakeRecordInputGroup,
  VoidRecordInputGroup,
} from '@/view/edit-record-modal/components';

type OnChangeCallback = (r: Record) => void;

class EditRecordInputVisitor implements RecordVisitor {
  private element: JSX.Element | null = null;

  private onChangeRecord: OnChangeCallback;

  constructor(r: Record, onChangeRecord: OnChangeCallback) {
    this.onChangeRecord = onChangeRecord;
    r.acceptVisitor(this);
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.element = this.makeIntakeInputGroup(r);
  }

  visitVoidRecord(r: VoidRecord): void {
    this.element = this.makeVoidInputGroup(r);
  }

  makeIntakeInputGroup(r: IntakeRecord) {
    return (
      <IntakeRecordInputGroup
        intakeRecord={r}
        onChangeRecord={this.onChangeRecord}
      />
    );
  }

  makeVoidInputGroup(r: VoidRecord) {
    return (
      <VoidRecordInputGroup
        voidRecord={r}
        onChangeRecord={this.onChangeRecord}
      />
    );
  }

  getElement() {
    return this.element;
  }
}

export { EditRecordInputVisitor };
