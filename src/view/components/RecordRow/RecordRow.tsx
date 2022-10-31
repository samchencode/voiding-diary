import React, { useCallback, useRef, useState } from 'react';
import type { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { DropDownMenu } from '@/view/components/DropDownMenu';
import { Portal } from '@/view/portal';

type RowProps = {
  title: string;
  subtitle: string;
  iconName: string;
  id?: string;
  options?: DropDownItemSpec[];
};

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

type MeasureIconResult = LayoutRectangle;

type WindowDimensions = { width: number; height: number };

const makeDropDownTransformFromIconMeasurement = (
  {
    pageX: iconX,
    pageY: iconY,
    width: iconWidth,
    height: iconHeight,
  }: MeasureIconResult,
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
    useState<MeasureIconResult | null>(null);

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

function Row({ title, subtitle, iconName, options, id: key = '0' }: RowProps) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={40}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <View style={styles.titleGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {options && <RowDropDown options={options} id={key} />}
    </View>
  );
}

Row.defaultProps = {
  options: undefined,
  id: '0',
};

type RecordRowProps = {
  volume?: string;
  options?: DropDownItemSpec[];
  time: string;
  id?: string;
};

function IntakeRecordRow({ volume, time, options, id }: RecordRowProps) {
  const title = !volume ? 'Intake' : `Intake ${volume}`;
  return (
    <Row
      iconName="glass-whiskey"
      title={title}
      subtitle={time}
      options={options}
      id={id}
    />
  );
}

IntakeRecordRow.defaultProps = { volume: '', options: undefined, id: '0' };

function VoidRecordRow({ volume, time, options, id }: RecordRowProps) {
  const title = !volume ? 'Void' : `Void ${volume}`;
  return (
    <Row
      iconName="toilet"
      title={title}
      subtitle={time}
      options={options}
      id={id}
    />
  );
}

VoidRecordRow.defaultProps = { volume: '', options: undefined, id: '0' };

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spaces.lg,
    paddingTop: theme.spaces.sm,
    paddingBottom: theme.spaces.sm,
    paddingRight: theme.spaces.xl - 12,
  },
  icon: {
    marginRight: theme.spaces.lg,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
  titleGroup: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.fonts.smBold,
  },
  subtitle: {
    ...theme.fonts.xs,
  },
  dropDownToggle: {
    width: 48,
    height: 48,
  },
  dropDownMenu: {
    position: 'absolute',
  },
});

export { IntakeRecordRow, VoidRecordRow };
