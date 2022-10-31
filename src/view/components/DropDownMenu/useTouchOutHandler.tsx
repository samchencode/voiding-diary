import type React from 'react';
import { useCallback, useRef } from 'react';
import type { View, GestureResponderEvent } from 'react-native';
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
export function useTouchOutHandler(
  onPressOut: (() => void) | undefined,
  visible: boolean
): [React.RefObject<View>, (cb?: (l: LayoutRectangle) => void) => void] {
  const menuRef = useRef<View>(null);
  const onLayout = useCallback(
    (onMeasure?: (r: LayoutRectangle) => void) => {
      if (!menuRef.current || !onPressOut) return;
      if (visible) {
        const menu = menuRef.current;
        menu.measure((x, y, width, height, pageX, pageY) => {
          handleFocus({ x, y, width, height, pageX, pageY }, onPressOut);
          if (onMeasure) onMeasure({ x, y, width, height, pageX, pageY });
        });
      } else if (!visible && handler.length > 0) handleBlur();
    },
    [menuRef, onPressOut, visible]
  );

  return [menuRef, onLayout];
}
