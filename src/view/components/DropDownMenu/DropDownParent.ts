import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type React from 'react';

interface DropDownParent extends React.Component {
  handleMenuAndIconMeasured(
    menuRectangle: LayoutRectangle,
    iconRectangle: LayoutRectangle
  ): void;
}

export type { DropDownParent };
