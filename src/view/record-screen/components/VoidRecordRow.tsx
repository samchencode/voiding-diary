import React from 'react';
import type { VoidRecord } from '@/domain/models/Record';
import { VoidRecordRow as BaseVoidRecordRow } from '@/view/components/RecordRow';

type VoidRecordRowProps = {
  voidRecord: VoidRecord;
  onEdit: (r: VoidRecord) => void;
  onDelete: (r: VoidRecord) => void;
};

function VoidRecordRow({ voidRecord, onEdit, onDelete }: VoidRecordRowProps) {
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
    />
  );
}

export { VoidRecordRow };
