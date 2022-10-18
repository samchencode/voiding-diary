import React from 'react';
import { theme } from '@/view/theme';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

type SizeOptionProps = {
  title: string;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

function SizeOption({ title, size, setSize }: SizeOptionProps) {
  return (
    <TouchableHighlight
      onPress={() => {
        setSize(size);
      }}
    >
      <Text style={styles.sizes}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  sizes: {
    ...theme.fonts.md,
    color: theme.colors.accent,
    paddingRight: theme.spaces.sm,
  },
});

export { SizeOption };
