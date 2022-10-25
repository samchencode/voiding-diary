import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
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

class RowRecordVisitor implements RecordVisitor {
  private rowElement?: JSX.Element;

  private record?: Record;

  private onEditIntakeRecord: (r: IntakeRecord) => void;

  private onEditVoidRecord: (r: VoidRecord) => void;

  constructor(
    r: Record,
    onEditIntakeRecord: (r: IntakeRecord) => void = () => {},
    onEditVoidRecord: (r: VoidRecord) => void = () => {}
  ) {
    r.acceptVisitor(this);
    this.onEditIntakeRecord = onEditIntakeRecord;
    this.onEditVoidRecord = onEditVoidRecord;
  }

  visitIntakeRecord(r: IntakeRecord): void {
    this.record = r;
    this.rowElement = (
      <Pressable
        key={r.getId().getValue()}
        onPress={() => {
          this.onEditIntakeRecord(r);
        }}
      >
        <IntakeRecordRow
          volume={r.getIntakeVolumeString()}
          time={r.getTimeString()}
        />
      </Pressable>
    );
  }

  visitVoidRecord(r: VoidRecord): void {
    this.record = r;
    this.rowElement = (
      <Pressable
        key={r.getId().getValue()}
        onPress={() => {
          this.onEditVoidRecord(r);
        }}
      >
        <VoidRecordRow
          volume={r.getUrineVolumeString()}
          time={r.getTimeString()}
        />
      </Pressable>
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
