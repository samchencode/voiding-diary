import type { Volume } from '@/domain/models/Volume';
import { theme } from '@/view/theme';
import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type VolumeOptionProps = {
  value: Volume;
  onSelectOption: (v: Volume) => void;
  selected: boolean;
  label?: string;
};

function VolumeOption({
  value,
  onSelectOption,
  selected,
  label,
}: VolumeOptionProps) {
  const handlePress = useCallback(
    () => onSelectOption(value),
    [onSelectOption, value]
  );

  const optionLabel = label ?? value.toString();
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={handlePress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {optionLabel}
      </Text>
    </TouchableOpacity>
  );
}

VolumeOption.defaultProps = {
  label: undefined,
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spaces.xs,
    borderRadius: theme.br,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSelected: {
    backgroundColor: theme.colors.accent,
  },
  label: {
    ...theme.fonts.sm,
    color: theme.colors.accent,
  },
  labelSelected: {
    color: theme.colors.light,
  },
});

export { VolumeOption };
