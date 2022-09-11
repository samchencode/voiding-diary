import { Card, Button } from '@/view/components';
import { SizeOption } from '@/view/modals/SizeOption';
import { theme } from '@/view/theme';
import React, { useState } from 'react';

import { Text, StyleSheet, Modal, TextInput, View } from 'react-native';

type RecordIntakeModalProps = {
  visible: boolean;
  recordIntake: (beverage: string, size: number, time: number) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function RecordIntakeModal({
  visible,
  recordIntake,
  setModalVisible,
}: RecordIntakeModalProps) {
  const [beverage, setBeverage] = useState('');
  const [size, setSize] = useState(0);
  const time = 0;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}
      style={styles.modal}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>+Intake</Text>
        <Text style={styles.subTitle}>Beverage</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Water"
          onChangeText={(newText) => setBeverage(newText)}
          defaultValue={beverage}
        />
        <Text style={styles.subTitle}>Size</Text>
        <View style={styles.container}>
          <SizeOption title="8oz" size={8} setSize={setSize} />
          <SizeOption title="10oz" size={10} setSize={setSize} />
          <SizeOption title="16oz" size={16} setSize={setSize} />
          <SizeOption title="other" size={0} setSize={setSize} />
        </View>
        <Button
          onPress={() => {
            setModalVisible(false);
            // throw error if size or beverage are unfilled
            recordIntake(beverage, size, time);
          }}
          title="Add"
        />
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 302,
    width: 363,
    margin: theme.spaces.lg,
    marginTop: 0,
    elevation: 5,
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginTop: -6,
  },
  subTitle: {
    ...theme.fonts.sm,
  },
  textInput: {
    height: 40,
    ...theme.fonts.sm,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    ...theme.fonts.sm,
  },
  sizes: {
    ...theme.fonts.md,
    color: theme.colors.accent,
    padding: theme.spaces.lg,
  },
});

export { RecordIntakeModal };
