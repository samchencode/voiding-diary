import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';

type IconButtonProps = {
  name: string;
  color: string;
  onPress: () => void;
};

function IconButton(
  { name, color, onPress }: IconButtonProps,
  ref: React.ForwardedRef<TouchableOpacity>
) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} ref={ref}>
      <Icon name={name} size={24} color={color ?? theme.colors.light} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
});

const IconButtonWithForwardedRef = React.forwardRef(IconButton);

export { IconButtonWithForwardedRef as IconButton };
