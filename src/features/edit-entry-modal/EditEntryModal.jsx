import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme, baseTheme } from '../theme';
import { Button } from '../common';
import Modal from './Modal';

function EditEntryModal(props) {
  const { navigation } = props;
  const { colors } = useTheme();

  return (
    <Modal onDismiss={() => navigation.goBack()}>
      <Text style={styles.title}>+Intake</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Beverage</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder="Name"
        />
      </View>
      <Text style={styles.label}>Amount</Text>
      <View style={[styles.inputGroup, styles.amountInputGroup]}>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>8oz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>
            12oz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>
            16oz
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder="other"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[
              styles.outlineButton,
              styles.button,
              {
                color: colors.gray,
                borderColor: colors.gray,
              },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Button.Success
          title="Save"
          onPress={() => {}}
          style={[styles.button]}
        />
      </View>
    </Modal>
  );
}

const { spaces, fonts, br } = baseTheme;

const styles = StyleSheet.create({
  title: { ...fonts.lg },
  label: { ...fonts.sm },
  input: {
    borderBottomWidth: 1,
  },
  inputText: { ...fonts.mdBold },
  inputGroup: {
    marginBottom: spaces.lg,
  },
  amountInputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 100,
  },
  outlineButton: {
    ...fonts.mdBold,
    textAlign: 'center',
    borderRadius: br,
    borderWidth: 1,
    paddingTop: spaces.sm - 1,
    paddingBottom: spaces.sm - 1,
  },
});

export default EditEntryModal;
