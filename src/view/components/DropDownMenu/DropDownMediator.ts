import type { RefObject } from 'react';
import type { View, TouchableOpacity } from 'react-native';
import { DropDownBackHandler } from '@/view/components/DropDownMenu/DropDownBackHandler';
import type { DropDownMenu } from '@/view/components/DropDownMenu/DropDownMenu';
import { DropDownTouchOutHandler } from '@/view/components/DropDownMenu/DropDownTouchOutHandler';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
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
    this.viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      this.notifyVisibleMenuMeasured({ x, y, width, height, pageX, pageY });
    });
  }

  notifyMenuInvisible() {
    if (this.backHandler?.hasSubscription()) {
      this.backHandler.unsubscribe();
    }
    if (this.touchOutHandler.hasSubscription()) {
      this.touchOutHandler.handleBlur();
    }
  }

  notifyVisibleMenuMeasured(menuRectangle: LayoutRectangle) {
    if (!this.iconRef?.current) {
      this.touchOutHandler.handleFocus(menuRectangle);
    } else {
      this.iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        this.notifyMenuAndIconMeasured(menuRectangle, {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      });
    }
  }

  notifyMenuAndIconMeasured(
    menuRectangle: LayoutRectangle,
    iconRectangle: LayoutRectangle
  ) {
    this.touchOutHandler.handleFocus(menuRectangle, iconRectangle);
    this.parent?.handleMenuAndIconMeasured(menuRectangle, iconRectangle);
  }
}

export { DropDownMediator };
