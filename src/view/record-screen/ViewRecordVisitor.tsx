import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type {
  IntakeRecord,
  RecordVisitor,
  VoidRecord,
  Record,
} from '@/domain/models/Record';
import { RecordCard } from '@/view/record-screen/components';
import { VoidRecordRow, IntakeRecordRow } from '@/view/components';

type FilledRecordCardProps = {
  style?: StyleProp<ViewStyle>;
};

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
      <VoidRecordRow
        key={this.key}
        volume={r.getUrineVolumeString()}
        time={r.getTimeString()}
      />
    );
  }

  getRow() {
    if (!this.rowElement) throw Error();
    return this.rowElement;
  }

  getKey() {
    if (!this.key) throw Error();
    return this.key;
  }

  makeCard() {
    const row = this.getRow();
    const key = this.getKey();

    function FilledRecordCard({ style }: FilledRecordCardProps) {
      return <RecordCard recordRow={row} style={style} key={key} />;
    }

    FilledRecordCard.defaultProps = {
      style: {},
    };

    return FilledRecordCard;
  }

  makeCardAndKey(): [(p: FilledRecordCardProps) => JSX.Element, string] {
    return [this.makeCard(), this.getKey()];
  }

  static makeKey(r: Record) {
    return makeKey(r);
  }
}

export { ViewRecordVisitor };
