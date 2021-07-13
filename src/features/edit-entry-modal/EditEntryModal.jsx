import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { useTheme, baseTheme } from '../theme';
import Modal from './Modal';

function EditEntryModal(props) {
  const { navigation } = props;
  const { colors } = useTheme();

  return (
    <Modal onDismiss={() => navigation.goBack()}>
      <Text style={styles.title}>+Intake</Text>
      <Text style={styles.label}>Beverage</Text>
      <TextInput style={[styles.input, styles.inputText]} placeholder="Name" />
      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountInputGroup}>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>8oz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>12oz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.inputText, { color: colors.primary }]}>16oz</Text>
        </TouchableOpacity>
        <TextInput style={styles.inputText} placeholder="other" />
      </View>
      <TouchableHighlight>
        <View >
          <Text>Save</Text>
        </View>
      </TouchableHighlight>
    </Modal>
  );
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  title: { ...fonts.lg },
  label: { ...fonts.sm },
  input: {
    marginBottom: spaces.sm,
  },
  inputText: { ...fonts.md },
  amountInputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spaces.lg,
  },
});

export default EditEntryModal;
