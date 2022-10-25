import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { theme } from '@/view/theme';

type DropDownItemSpec = {
  key: number | string;
  label: string;
  iconName: string;
  onPress: () => void;
};

type DropDownMenuProps = {
  items: DropDownItemSpec[];
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

function DropDownMenu({ items, visible, style }: DropDownMenuProps) {
  return (
    <View
      style={[styles.container, { display: visible ? 'flex' : 'none' }, style]}
    >
      {items.map((v) => (
        <DropDownItem
          key={v.key}
          label={v.label}
          iconName={v.iconName}
          onPress={v.onPress}
        />
      ))}
    </View>
  );
}

DropDownMenu.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingTop: 8,
    paddingBottom: 8,
    ...theme.shadow,
  },
});

export { DropDownMenu };
export type { DropDownItemSpec };
