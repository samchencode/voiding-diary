import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type {
  IntakeRecord,
  RecordVisitor,
  VoidRecord,
  Record,
} from '@/domain/models/Record';
import {
  VoidRecordRow,
  IntakeRecordRow,
} from '@/view/components/RecordRow/RecordRow';
import { Card } from '@/view/components/Card';

type RecordRowMenuHandlerGroup<T extends Record> = {
  onPressEdit(r: T): void;
  onPressDelete(r: T): void;
};

type RecordRowMenuHandlers = {
  intakeRecord: RecordRowMenuHandlerGroup<IntakeRecord>;
  voidRecord: RecordRowMenuHandlerGroup<VoidRecord>;
};

function makeMenuOptions<T extends Record>(
  r: T,
  h: RecordRowMenuHandlerGroup<T>
) {
  return [
    {
      key: 1,
      iconName: 'edit',
      label: 'Edit Record',
      onPress: () => h.onPressEdit(r),
    },
    {
      key: 2,
      iconName: 'minus-circle',
      label: 'Delete Record',
      onPress: () => h.onPressDelete(r),
    },
  ];
}

class RowRecordVisitor implements RecordVisitor {
  private rowElement?: JSX.Element;

  private record?: Record;

  private handlers?: RecordRowMenuHandlers;

  constructor(r: Record, handlers?: RecordRowMenuHandlers) {
    this.handlers = handlers;
    r.acceptVisitor(this);
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.record = r;
    this.rowElement = (
      <IntakeRecordRow
        key={r.getId().getValue()}
        volume={r.getIntakeVolumeString()}
        time={r.getTimeString()}
        options={
          this.handlers && makeMenuOptions(r, this.handlers.intakeRecord)
        }
      />
    );
  }

  visitVoidRecord(r: VoidRecord): void {
    this.record = r;
    this.rowElement = (
      <VoidRecordRow
        key={r.getId().getValue()}
        volume={r.getUrineVolumeString()}
        time={r.getTimeString()}
        options={this.handlers && makeMenuOptions(r, this.handlers.voidRecord)}
      />
    );
  }

  getRow() {
    if (!this.rowElement) throw Error();
    return this.rowElement;
  }

  getKey() {
    if (!this.record) throw Error();
    return this.record.getId().getValue();
  }

  makeCard(style: StyleProp<ViewStyle>) {
    const row = this.getRow();
    const key = this.getKey();

    return (
      <Card key={key} style={style}>
        {row}
      </Card>
    );
  }
}

export { RowRecordVisitor };
