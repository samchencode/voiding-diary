import { theme } from '@/view/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

type DropDownItemProps = {
  onPress: () => void;
  iconName: string;
  label: string;
};

function DropDownItem({ onPress, iconName, label }: DropDownItemProps) {
  return (
    <TouchableHighlight
      underlayColor={theme.colors.lightGray}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Icon name={iconName} style={styles.icon} size={24} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 112,
  },
  icon: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  label: {
    ...theme.fonts.menu,
  },
});

export { DropDownItem };
