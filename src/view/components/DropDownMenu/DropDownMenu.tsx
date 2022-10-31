import React, { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { theme } from '@/view/theme';
import { useTouchOutHandler } from '@/view/components/DropDownMenu/useTouchOutHandler';
import { useBackHandler } from '@/view/components/DropDownMenu/useBackHandler';
import { useCallback } from 'react';

type LayoutRectangle = {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
  width: number;
  height: number;
};

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
  onRequestDismiss?: () => void;
  onLayout?: (l: LayoutRectangle) => void;
};

function DropDownMenu({
  items,
  visible,
  style,
  onRequestDismiss: onPressOut,
  onLayout,
}: DropDownMenuProps) {
  useBackHandler(onPressOut, visible);
  const [menuRef, touchOutHandleLayout] = useTouchOutHandler(
    onPressOut,
    visible
  );

  const handleLayout = useCallback(
    () => touchOutHandleLayout(onLayout),
    [onLayout, touchOutHandleLayout]
  );

  return (
    <View
      style={[styles.container, { display: visible ? 'flex' : 'none' }, style]}
      onLayout={handleLayout}
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
  onRequestDismiss: () => {},
  onLayout: undefined,
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
