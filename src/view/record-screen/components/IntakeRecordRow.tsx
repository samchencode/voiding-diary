import React from 'react';
import type { IntakeRecord } from '@/domain/models/Record';
import { IntakeRecordRow as BaseIntakeRecordRow } from '@/view/components/RecordRow';

type IntakeRecordRowProps = {
  id: string;
  intakeRecord: IntakeRecord;
  onEdit: (r: IntakeRecord) => void;
  onDelete: (r: IntakeRecord) => void;
  screenHeight: number;
};

function IntakeRecordRow({
  id,
  intakeRecord,
  onEdit,
  onDelete,
  screenHeight,
}: IntakeRecordRowProps) {
  const handleEdit = React.useCallback(
    () => onEdit(intakeRecord),
    [intakeRecord, onEdit]
  );
  const handleDelete = React.useCallback(
    () => onDelete(intakeRecord),
    [intakeRecord, onDelete]
  );

  return (
    <BaseIntakeRecordRow
      volume={intakeRecord.getIntakeVolumeString()}
      time={intakeRecord.getTimeString()}
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

export { IntakeRecordRow };
