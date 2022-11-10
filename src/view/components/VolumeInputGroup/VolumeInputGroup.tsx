import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  VolumeInput,
  VolumeOption,
} from '@/view/components/VolumeInputGroup/components';
import type { Volume } from '@/domain/models/Volume';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';

type VolumeInputGroupProps = {
  style: StyleProp<ViewStyle>;
  value: Volume;
  onChangeValue: (v: Volume) => void;
};

function VolumeInputGroup({
  style,
  value,
  onChangeValue,
}: VolumeInputGroupProps) {
  const vol8Oz = useMemo(() => new VolumeInOz(8), []);
  const vol12Oz = useMemo(() => new VolumeInOz(12), []);
  const vol16Oz = useMemo(() => new VolumeInOz(16), []);
  const volUnk = useMemo(() => new UnknownVolume(), []);

  return (
    <View style={[styles.container, style]}>
      <VolumeOption
        value={vol8Oz}
        onSelectOption={onChangeValue}
        selected={value.is(vol8Oz)}
      />
      <VolumeOption
        value={vol12Oz}
        onSelectOption={onChangeValue}
        selected={value.is(vol12Oz)}
      />
      <VolumeOption
        value={vol16Oz}
        onSelectOption={onChangeValue}
        selected={value.is(vol16Oz)}
      />
      <VolumeOption
        value={volUnk}
        onSelectOption={onChangeValue}
        selected={value.is(volUnk)}
        label="Unknown"
      />
      <VolumeInput
        onChangeValue={onChangeValue}
        value={value}
        containerStyle={styles.inputField}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
  },
});

export { VolumeInputGroup };
