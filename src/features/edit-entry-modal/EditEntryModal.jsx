import React from 'react';
import { Text } from 'react-native';
import Modal from './Modal';

function EditEntryModal(props) {
  const { navigation } = props;

  return (
    <Modal onDismiss={() => navigation.goBack()}>
      <Text>Hi</Text>
    </Modal>
  );
}

export default EditEntryModal;
