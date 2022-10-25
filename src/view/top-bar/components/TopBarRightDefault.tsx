import React from 'react';
import { IconButton } from '@/view/components';
import { theme } from '@/view/theme';

type TopBarRightDefaultProps = {
  color?: string;
  onPress: () => void;
};

function TopBarRightDefault({
  color = theme.colors.light,
  onPress,
}: TopBarRightDefaultProps) {
  return <IconButton name="ellipsis-v" onPress={onPress} color={color} />;
}

TopBarRightDefault.defaultProps = {
  color: theme.colors.light,
};

export { TopBarRightDefault };
