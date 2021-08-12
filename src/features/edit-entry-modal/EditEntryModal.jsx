import React, { useState, useRef } from 'react';
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
import OpacityButton from './OpacityButton';
import { utils } from '../common';

const { isNumber } = utils.string;

function EditEntryModal(props) {
  const { navigation } = props;
  const { colors } = useTheme();

  const [label, setLabel] = useState('');
  const [volume, setVolume] = useState(8);
  const [usingVolumeInput, setUsingVolumeInput] = useState(false);
  const volumeInput = useRef(null);

  const handleInputVolume = (s) => {
    setUsingVolumeInput(true);
    if (isNumber(s)) setVolume(+s);
  };

  const handlePressVolume = (value) => {
    volumeInput.current.blur();
    setUsingVolumeInput(false);
    setVolume(value);
  };

  const buttonFocusStyle = {
    color: colors.light,
    backgroundColor: colors.primary,
  };

  const buttonUnfocusStyle = {
    color: colors.primary,
  };

  const shouldFocusVolumeButton = (v) => !usingVolumeInput && volume === v;

  return (
    <Modal onDismiss={() => navigation.goBack()}>
      <Text style={styles.title}>+Intake</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Beverage</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder="Name"
          value={label}
          onChangeText={setLabel}
        />
      </View>
      <Text style={styles.label}>Amount</Text>
      <View style={[styles.inputGroup, styles.amountInputGroup]}>
        <OpacityButton
          title="8oz"
          style={
            shouldFocusVolumeButton(8) ? buttonFocusStyle : buttonUnfocusStyle
          }
          onPress={() => handlePressVolume(8)}
        />
        <OpacityButton
          title="12oz"
          style={
            shouldFocusVolumeButton(12) ? buttonFocusStyle : buttonUnfocusStyle
          }
          onPress={() => handlePressVolume(12)}
        />
        <OpacityButton
          title="16oz"
          style={
            shouldFocusVolumeButton(16) ? buttonFocusStyle : buttonUnfocusStyle
          }
          onPress={() => handlePressVolume(16)}
        />
        <TextInput
          style={[styles.input, styles.inputText, { width: 72 }]}
          textAlign="center"
          multiline={false}
          placeholder="other"
          keyboardType="numeric"
          value={usingVolumeInput ? '' + volume : ''}
          onChangeText={handleInputVolume}
          ref={volumeInput}
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
  input: { borderBottomWidth: 1 },
  inputText: { ...fonts.mdBold },
  inputGroup: { marginBottom: spaces.lg },
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
  button: { width: 100 },
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
