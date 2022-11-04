import type { RefObject } from 'react';
import type { View, TouchableOpacity } from 'react-native';
import { DropDownBackHandler } from '@/view/components/DropDownMenu/DropDownBackHandler';
import type { DropDownMenu } from '@/view/components/DropDownMenu/DropDownMenu';
import { DropDownTouchOutHandler } from '@/view/components/DropDownMenu/DropDownTouchOutHandler';
import type {
  LayoutRectangle,
  LayoutRectangleWithoutPageCoordinates,
} from '@/view/components/DropDownMenu/LayoutRectangle';
import type { DropDownParent } from '@/view/components/DropDownMenu/DropDownParent';

class DropDownMediator {
  private menu?: DropDownMenu;

  private backHandler: DropDownBackHandler;

  private touchOutHandler: DropDownTouchOutHandler;

  private parent?: DropDownParent;

  private viewRef?: RefObject<View>;

  private iconRef?: RefObject<TouchableOpacity>;

  private onRequestDismiss?: () => void;

  constructor() {
    this.notifyRequestDismiss = this.notifyRequestDismiss.bind(this);
    this.touchOutHandler = new DropDownTouchOutHandler(this);
    this.backHandler = new DropDownBackHandler(this);
  }

  setMenu(m: DropDownMenu) {
    this.menu = m;
  }

  setBackHandler(bh: DropDownBackHandler) {
    this.backHandler = bh;
  }

  setTouchOutHandler(toh: DropDownTouchOutHandler) {
    this.touchOutHandler = toh;
  }

  setParent(p: DropDownParent) {
    this.parent = p;
  }

  setViewRef(v: RefObject<View>) {
    this.viewRef = v;
  }

  setIconRef(i: RefObject<TouchableOpacity>) {
    this.iconRef = i;
  }

  setOnRequestDismiss(fn: () => void) {
    this.onRequestDismiss = fn;
  }

  notifyRequestDismiss() {
    this.onRequestDismiss?.();
  }

  notifyMenuVisible() {
    if (this.backHandler && !this.backHandler.hasSubscription()) {
      this.backHandler.subscribe();
    }
  }

  notifyMenuInvisible() {
    if (this.backHandler?.hasSubscription()) {
      this.backHandler.unsubscribe();
    }
    if (this.touchOutHandler.hasSubscription()) {
      this.touchOutHandler.handleBlur();
    }
  }

  notifyVisibleMenuLayout(
    menuRectangle: LayoutRectangleWithoutPageCoordinates
  ) {
    if (this.parent && this.parent.isMenuPositionAbsolute()) {
      this.iconRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        this.notifyMenuLayoutDoneIconMeasured(menuRectangle, {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      });
      // measure icon -> position menu -> measure menu -> touchoutFocus
    } else {
      this.viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        this.notifyVisibleMenuMeasured({ x, y, width, height, pageX, pageY });
      });
    }
  }

  notifyVisibleMenuMeasured(menuRectangle: LayoutRectangle) {
    this.touchOutHandler.handleFocus(menuRectangle);
  }

  notifyMenuLayoutDoneIconMeasured(
    menuRectangle: LayoutRectangleWithoutPageCoordinates,
    iconRectangle: LayoutRectangle
  ) {
    this.parent?.handleMenuLayoutDoneAndIconMeasured(
      menuRectangle,
      iconRectangle
    );
  }

  notifyParentVisibleMenuTransformUpdated() {
    this.viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      const menuRectangle = { x, y, width, height, pageX, pageY };
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.iconRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        const iconRectangle = { x, y, width, height, pageX, pageY };
        this.notifyMenuAndIconMeasured(menuRectangle, iconRectangle);
      });
    });
  }

  notifyMenuAndIconMeasured(
    menuRectangle: LayoutRectangle,
    iconRectangle: LayoutRectangle
  ) {
    this.touchOutHandler.handleFocus(menuRectangle, iconRectangle);
  }

  notifyMenuUnmount() {
    if (this.touchOutHandler.hasSubscription())
      this.touchOutHandler.handleBlur();
    if (this.backHandler.hasSubscription()) this.backHandler.unsubscribe();
  }
}

export { DropDownMediator };
