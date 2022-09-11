import React from 'react';
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';

type ButtonProps = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  darkText?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

function Button({
  title,
  onPress,
  disabled,
  backgroundColor,
  borderColor,
  darkText,
  style,
  contentContainerStyle,
  titleStyle,
}: ButtonProps) {
  const defaultTextColor = darkText ? theme.colors.dark : theme.colors.light;

  const colorStyle = !disabled
    ? { backgroundColor, borderColor }
    : { backgroundColor: theme.colors.gray, borderColor: theme.colors.gray };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.button, colorStyle, contentContainerStyle]}>
        <Text
          style={[styles.buttonLabel, { color: defaultTextColor }, titleStyle]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  disabled: false,
  backgroundColor: theme.colors.gray,
  borderColor: theme.colors.gray,
  darkText: false,
  style: undefined,
  titleStyle: undefined,
  contentContainerStyle: undefined,
};

type PresetButtonProps = Pick<ButtonProps, 'title' | 'onPress'>;

Button.Success = function SuccessButton({ title, onPress }: PresetButtonProps) {
  return (
    <Button
      title={title}
      onPress={onPress}
      backgroundColor={theme.colors.success}
    />
  );
};

Button.Danger = function DangerButton({ title, onPress }: PresetButtonProps) {
  return (
    <Button
      title={title}
      onPress={onPress}
      backgroundColor={theme.colors.danger}
    />
  );
};

Button.Info = function InfoButton({ title, onPress }: PresetButtonProps) {
  return <Button title={title} onPress={onPress} />;
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.br,
  },
  button: {
    paddingTop: theme.spaces.sm,
    paddingBottom: theme.spaces.sm,
    borderRadius: theme.br,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonLabel: {
    ...theme.fonts.mdBold,
    textAlign: 'center',
  },
});

export { Button };
