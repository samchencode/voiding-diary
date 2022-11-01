import type { RefObject } from 'react';
import type { View } from 'react-native';
import type { DropDownBackHandler } from '@/view/components/DropDownMenu/DropDownBackHandler';
import type { DropDownMenu } from '@/view/components/DropDownMenu/DropDownMenu';
import type { DropDownTouchOutHandler } from '@/view/components/DropDownMenu/DropDownTouchOutHandler';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type { DropDownParent } from '@/view/components/DropDownMenu/DropDownParent';

class DropDownMediator {
  private menu?: DropDownMenu;

  private backHandler?: DropDownBackHandler;

  private touchOutHandler?: DropDownTouchOutHandler;

  private parent?: DropDownParent;

  private viewRef?: RefObject<View>;

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
    if (this.touchOutHandler?.hasSubscription()) {
      this.touchOutHandler.handleBlur();
    }
  }

  notifyVisibleMenuMeasured(l: LayoutRectangle) {
    this.touchOutHandler?.handleFocus(l);
  }
}

export { DropDownMediator };
