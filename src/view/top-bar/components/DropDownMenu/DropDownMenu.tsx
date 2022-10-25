import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DropDownItem } from '@/view/top-bar/components/DropDownMenu/DropDownItem';
import { theme } from '@/view/theme';

type DropDownMenuProps = {
  items: {
    key: number | string;
    label: string;
    iconName: string;
    onPress: () => void;
  }[];
  visible: boolean;
};

function DropDownMenu({ items, visible }: DropDownMenuProps) {
  return (
    <View style={[styles.container, { display: visible ? 'flex' : 'none' }]}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export { DropDownMenu };
