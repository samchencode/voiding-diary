import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { baseTheme } from '../theme';

const { fonts, spaces, br } = baseTheme;

function OpacityButton(props) {
  const { title, style, onPress, contentContinerStyle } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: spaces.sm,
    marginVertical: spaces.xs,
    borderRadius: br,
    ...fonts.mdBold,
  },
});

export default OpacityButton;
