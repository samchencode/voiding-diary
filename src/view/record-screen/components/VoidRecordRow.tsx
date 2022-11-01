import React from 'react';
import type { VoidRecord } from '@/domain/models/Record';
import { VoidRecordRow as BaseVoidRecordRow } from '@/view/components/RecordRow';

type VoidRecordRowProps = {
  id: string;
  voidRecord: VoidRecord;
  onEdit: (r: VoidRecord) => void;
  onDelete: (r: VoidRecord) => void;
  screenHeight: number;
};

function VoidRecordRow({
  voidRecord,
  onEdit,
  onDelete,
  id,
  screenHeight,
}: VoidRecordRowProps) {
  const handleEdit = React.useCallback(
    () => onEdit(voidRecord),
    [onEdit, voidRecord]
  );

  const handleDelete = React.useCallback(
    () => onDelete(voidRecord),
    [onDelete, voidRecord]
  );

  return (
    <BaseVoidRecordRow
      time={voidRecord.getTimeString()}
      volume={voidRecord.getUrineVolumeString()}
      options={[
        {
          key: 1,
          iconName: 'edit',
          label: 'Edit',
          onPress: handleEdit,
        },
        {
          key: 2,
          iconName: 'minus-circle',
          label: 'Delete',
          onPress: handleDelete,
        },
      ]}
      id={id}
      screenHeight={screenHeight}
    />
  );
}

export { VoidRecordRow };
