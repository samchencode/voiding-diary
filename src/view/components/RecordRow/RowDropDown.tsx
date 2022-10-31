import React, { useCallback, useRef, useState } from 'react';
import type { TouchableOpacity } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { DropDownMenu } from '@/view/components/DropDownMenu';
import { Portal } from '@/view/portal';

type RowDropDownProps = {
  options: DropDownItemSpec[];
  id: string;
};

type LayoutRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

type WindowDimensions = { width: number; height: number };

const makeDropDownTransformFromIconMeasurement = (
  {
    pageX: iconX,
    pageY: iconY,
    width: iconWidth,
    height: iconHeight,
  }: LayoutRectangle,
  { height: windowHeight }: WindowDimensions,
  { width: menuWidth, height: menuHeight }: LayoutRectangle
) => {
  const iconXMax = iconX + iconWidth;
  const iconYMax = iconY + iconHeight;
  const menuYMaxIsBelowWindow = iconYMax + menuHeight < windowHeight;
  return {
    transform: [
      { translateX: iconXMax - menuWidth },
      { translateY: menuYMaxIsBelowWindow ? iconYMax : iconY - menuHeight },
    ],
  };
};

function RowDropDown({ options, id }: RowDropDownProps) {
  const [visible, setVisible] = useState(false);
  const [measureIconResult, setMeasureIconResult] =
    useState<LayoutRectangle | null>(null);

  const [dropDownLayout, setDropDownLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });

  const iconButton = useRef<TouchableOpacity | null>(null);

  const windowDimensions = useWindowDimensions();

  const handleToggle = useCallback(() => {
    if (!iconButton.current) return;
    iconButton.current.measure((x, y, width, height, pageX, pageY) => {
      setMeasureIconResult({ x, y, width, height, pageX, pageY });
    });
    setVisible(!visible);
  }, [visible]);

  const handleLayoutDropDown = useCallback(
    (l: LayoutRectangle) => setDropDownLayout(l),
    []
  );

  const optionsOnPressToggleVisible = options.map((o) => {
    const onPress = () => {
      handleToggle();
      o.onPress();
    };
    return { ...o, onPress };
  });

  return (
    <>
      <IconButton
        name="ellipsis-v"
        onPress={handleToggle}
        color={theme.colors.dark}
        ref={iconButton}
      />
      <Portal id={`RecordRow.RowDropDown-${id}`}>
        <DropDownMenu
          onLayout={handleLayoutDropDown}
          items={optionsOnPressToggleVisible}
          visible={visible}
          style={[
            styles.dropDownMenu,
            measureIconResult &&
              makeDropDownTransformFromIconMeasurement(
                measureIconResult,
                windowDimensions,
                dropDownLayout
              ),
          ]}
          onRequestDismiss={handleToggle}
        />
      </Portal>
    </>
  );
}

export const styles = StyleSheet.create({
  dropDownMenu: {
    position: 'absolute',
  },
});

export { RowDropDown };
