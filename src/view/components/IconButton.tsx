import { theme } from '@/view/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

type IconButtonProps = {
  name: string;
  color: string;
  onPress: () => void;
};

function IconButton({ name, color, onPress }: IconButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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

export { IconButton };
