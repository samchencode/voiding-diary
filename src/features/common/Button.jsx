import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';

function Button(props) {
  const {
    title,
    onPress,
    underlayColor,
    backgroundColor,
    darkText,
    style,
    contentContainerStyle,
    titleStyle,
  } = props;
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={[styles.buttonContainer, style]}
      onPress={onPress}
    >
      <View style={[styles.button, { backgroundColor }, contentContainerStyle]}>
        <Text
          style={[
            styles.buttonLabel,
            { color: darkText ? colors.dark : colors.light },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

Button.Success = function (props) {
  const { colors } = useTheme();

  return (
    <Button
      underlayColor="green"
      backgroundColor={colors.success}
      darkText
      {...props}
    />
  );
};

Button.Danger = function (props) {
  const { colors } = useTheme();

  return (
    <Button
      underlayColor="#3C1522"
      backgroundColor={colors.danger}
      {...props}
    />
  );
};

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
    justifyContent: 'center',
  },
  buttonLabel: {
    ...fonts.mdBold,
    textAlign: 'center',
  },
});

export default Button;
