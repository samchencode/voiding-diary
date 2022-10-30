import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { theme } from '@/view/theme';
import { useTouchOutHandler } from '@/view/components/DropDownMenu/useTouchOutHandler';

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
  onPressOut?: () => void;
};

function DropDownMenu({
  items,
  visible,
  style,
  onPressOut,
}: DropDownMenuProps) {
  const menuRef = useRef<View>(null);

  const onLayout = useTouchOutHandler(menuRef, onPressOut, visible);

  return (
    <View
      style={[styles.container, { display: visible ? 'flex' : 'none' }, style]}
      onLayout={onLayout}
      ref={menuRef}
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
  onPressOut: () => {},
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
