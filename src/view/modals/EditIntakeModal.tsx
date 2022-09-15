import { Card, Button } from '@/view/components';
import { BaseModal } from '@/view/modals/BaseModal';
import { SizeOptionOther } from '@/view/modals/SizeOptionOther';
import { theme } from '@/view/theme';
import React, { useState } from 'react';

import { Text, StyleSheet, TextInput, View } from 'react-native';

type EditIntakeModalProps = {
  visible: boolean;
  editIntake: (beverage: string, size: number, time: number) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditIntakeModal({
  visible,
  editIntake,
  setModalVisible,
}: EditIntakeModalProps) {
  const [beverage, setBeverage] = useState('');
  const [size, setSize] = useState(0);
  const time = 0;

  return (
    <BaseModal setModalVisible={setModalVisible} visible={visible}>
      <Card style={styles.card}>
        <Text style={styles.title}>Edit Intake</Text>
        <Text style={styles.subTitle}>Beverage</Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={(newText) => setBeverage(newText)}
          defaultValue={beverage}
          value={beverage}
        />

        <View style={styles.container}>
          <Text style={styles.subTitle}>Size: </Text>
          <SizeOptionOther setSize={setSize} size={size} />
        </View>
        <Button
          onPress={() => {
            setModalVisible(false);
            // throw error if size or beverage are unfilled
            // save "beverage" and "size" to database
            editIntake(beverage, size, time);
          }}
          title="Save Changes"
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

export { EditIntakeModal };
