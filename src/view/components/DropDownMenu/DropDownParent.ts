import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type React from 'react';

interface DropDownParent extends React.Component {
  handleMenuLayoutDoneAndIconMeasured(
    menuRectangle: Omit<LayoutRectangle, 'pageX' | 'pageY'>,
    iconRectangle: LayoutRectangle
  ): void;

  isMenuPositionAbsolute(): boolean;
}

export type { DropDownParent };
