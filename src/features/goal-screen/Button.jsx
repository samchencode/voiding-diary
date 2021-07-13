import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

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

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
    display: 'flex',
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
  },
});

export default Button;
