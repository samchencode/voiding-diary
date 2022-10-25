import React from 'react';
import { Platform } from 'react-native';
import { IconButton } from '@/view/components';
import { TopBarRightDefault } from '@/view/top-bar/components/TopBarRightDefault';
import { theme } from '@/view/theme';

type TopBarRightRecordScreenProps = {
  color?: string;
  onPressDropDown: () => void;
  onPressExport: () => void;
};

function TopBarRightRecordScreen({
  color = theme.colors.light,
  onPressDropDown,
  onPressExport,
}: TopBarRightRecordScreenProps) {
  const shareIconName = Platform.OS === 'ios' ? 'share-square' : 'share-alt';
  return (
    <>
      <IconButton name={shareIconName} onPress={onPressExport} color={color} />
      <TopBarRightDefault color={color} onPress={onPressDropDown} />
    </>
  );
}

TopBarRightRecordScreen.defaultProps = {
  color: theme.colors.light,
};

export { TopBarRightRecordScreen };
