import { Card, Button } from '@/view/components';
import { BaseModal } from '@/view/modals/BaseModal';
import { SizeOption } from '@/view/modals/SizeOption';
import { SizeOptionOther } from '@/view/modals/SizeOptionOther';
import { theme } from '@/view/theme';
import React, { useState } from 'react';

import { Text, StyleSheet, TextInput, View } from 'react-native';

type RecordIntakeModalProps = {
  visible: boolean;
  recordIntake: (amount: number) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function RecordIntakeModal({
  visible,
  recordIntake,
  setModalVisible,
}: RecordIntakeModalProps) {
  const [beverage, setBeverage] = useState('');
  const [size, setSize] = useState(0);

  return (
    <BaseModal
      setModalVisible={setModalVisible}
      visible={visible}
      onCancel={() => {
        setBeverage('');
        setSize(0);
      }}
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
          <SizeOptionOther setSize={setSize} size={size} />
        </View>
        <Button
          onPress={() => {
            setModalVisible(false);
            recordIntake(size);
            setBeverage('');
            setSize(0);
          }}
          title="Add"
        />
      </Card>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
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
});

export { RecordIntakeModal };
