import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';

function Button(props) {
  const { title, onPress, style } = props;
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      underlayColor="green"
      style={[style, styles.buttonContainer]}
      onPress={onPress}
    >
      <View style={[styles.button, { backgroundColor: colors.success }]}>
        <Text style={styles.buttonLabel}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const { spaces, br, fonts } = baseTheme;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: br,
  },
  button: {
    paddingTop: spaces.sm,
    paddingBottom: spaces.sm,
    borderRadius: br,
    display: 'flex',
  },
  buttonLabel: {
    ...fonts.mdBold,
    textAlign: 'center',
  },
});

export default Button;
