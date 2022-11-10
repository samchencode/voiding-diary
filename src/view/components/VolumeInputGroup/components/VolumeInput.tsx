import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import type { Volume } from '@/domain/models/Volume';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';
import { theme } from '@/view/theme';

type VolumeInputProps = {
  value: Volume;
  onChangeValue: (v: Volume) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const isNumeric = (s: string) => !!s.match(/[0-9]+/);

function VolumeInput({
  value,
  onChangeValue,
  containerStyle,
}: VolumeInputProps) {
  const onChangeText = React.useCallback(
    (newValue: string) => {
      if (newValue === '') onChangeValue(new UnknownVolume());
      if (!isNumeric(newValue)) return;
      const numericVolume = Number.parseInt(newValue, 10);
      onChangeValue(new VolumeInOz(numericVolume));
    },
    [onChangeValue]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        maxLength={4}
        value={value.getValueString()}
        onChangeText={onChangeText}
        placeholder="Other"
      />
      <Text style={styles.unitText}>{value.getUnitString()}</Text>
    </View>
  );
}

VolumeInput.defaultProps = {
  containerStyle: undefined,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputField: {
    flex: 1,
    textAlign: 'right',
    ...theme.fonts.sm,
  },
  unitText: {
    marginLeft: theme.spaces.xs,
    ...theme.fonts.sm,
  },
});

export { VolumeInput };
