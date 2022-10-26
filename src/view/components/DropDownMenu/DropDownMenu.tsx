import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { theme } from '@/view/theme';
import { TouchOutHandler } from '@/view/touch-out-handler';

let handler: (_: GestureResponderEvent) => boolean = () => false;

type LayoutRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

function handleFocus(l: LayoutRectangle, handlePressOut: () => void) {
  const touchOutHandler = TouchOutHandler.getInstance();
  const { pageX: x, pageY: y, width, height } = l;
  const [xMin, yMin, xMax, yMax] = [x, y, x + width, y + height];
  const [iXMin, iYMin, iXMax, iYMax] = [xMax - 48, y - 48, xMax, y];
  handler = (evt) => {
    const { pageX: touchX, pageY: touchY } = evt.nativeEvent;
    const isOutOfBounds =
      touchX < xMin || touchX > xMax || touchY < yMin || touchY > yMax;
    const isOutOfIconBounds =
      touchX < iXMin || touchX > iXMax || touchY < iYMin || touchY > iYMax;
    if (!isOutOfBounds || !isOutOfIconBounds) return false;
    handlePressOut();
    return true;
  };
  touchOutHandler.addShouldCaptureHandler(handler);
}

function handleBlur() {
  const touchOutHandler = TouchOutHandler.getInstance();
  touchOutHandler.removeShouldCaptureHandler(handler);
}

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

  const onLayout = useCallback(() => {
    if (!menuRef.current || !onPressOut) return;
    if (visible) {
      const menu = menuRef.current;
      menu.measure((x, y, width, height, pageX, pageY) => {
        handleFocus({ x, y, width, height, pageX, pageY }, onPressOut);
      });
    } else if (!visible && handler.length > 0) handleBlur();
  }, [visible, onPressOut]);

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
