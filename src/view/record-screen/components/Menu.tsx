import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';

type MenuProps = {
  onPressExport: () => void;
};

function Menu({ onPressExport }: MenuProps) {
  const shareIconName = Platform.OS === 'ios' ? 'share-square' : 'share-alt';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggle} onPress={onPressExport}>
        <Icon name={shareIconName} size={24} color={theme.colors.dark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  toggle: {
    height: 56,
    width: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Menu };
