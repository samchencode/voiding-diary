import React from 'react';
import { Platform } from 'react-native';
import { IconButton } from '@/view/top-bar/components/IconButton';
import { TopBarRightDefault } from '@/view/top-bar/components/TopBarRightDefault';
import { theme } from '@/view/theme';

type TopBarRightRecordScreenProps = {
  color?: string;
  onPressDropDown: () => void;
};

function TopBarRightRecordScreen({
  color = theme.colors.light,
  onPressDropDown,
}: TopBarRightRecordScreenProps) {
  const shareIconName = Platform.OS === 'ios' ? 'share-square' : 'share-alt';
  return (
    <>
      <IconButton
        name={shareIconName}
        onPress={() => alert('share click')}
        color={color}
      />
      <TopBarRightDefault color={color} onPress={onPressDropDown} />
    </>
  );
}

TopBarRightRecordScreen.defaultProps = {
  color: theme.colors.light,
};

export { TopBarRightRecordScreen };
