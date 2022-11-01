import type { GestureResponderEvent } from 'react-native';
import { TouchOutHandler } from '@/view/touch-out-handler';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';

type TouchOutHandlerCallback = (e: GestureResponderEvent) => boolean;

class DropDownTouchOutHandler {
  private handler: TouchOutHandlerCallback | null = null;

  private touchOutHandler: TouchOutHandler;

  private mediator: DropDownMediator;

  constructor(mediator: DropDownMediator) {
    this.touchOutHandler = TouchOutHandler.getInstance();
    this.mediator = mediator;
  }

  handleFocus(menuRectangle: LayoutRectangle, iconRectangle?: LayoutRectangle) {
    this.handler = this.makeHandler(menuRectangle, iconRectangle);
    this.touchOutHandler.addShouldCaptureHandler(this.handler);
  }

  handleBlur() {
    if (!this.handler) return;
    this.touchOutHandler.removeShouldCaptureHandler(this.handler);
    this.handler = null;
  }

  hasSubscription() {
    return this.handler !== null;
  }

  private makeHandler(
    {
      pageX: menuX,
      pageY: menuY,
      width: menuWidth,
      height: menuHeight,
    }: LayoutRectangle,
    icon?: LayoutRectangle
  ) {
    const [mXMin, mYMin, mXMax, mYMax] = [
      menuX,
      menuY,
      menuX + menuWidth,
      menuY + menuHeight,
    ];
    const iconOrDefault = icon ?? {
      pageX: mXMax - 48,
      pageY: menuY - 48,
      width: 48,
      height: 48,
    };
    const {
      pageX: iconX,
      pageY: iconY,
      width: iconWidth,
      height: iconHeight,
    } = iconOrDefault;
    const [iXMin, iYMin, iXMax, iYMax] = [
      iconX,
      iconY,
      iconX + iconWidth,
      iconY + iconHeight,
    ];

    return (evt: GestureResponderEvent) => {
      const { pageX: touchX, pageY: touchY } = evt.nativeEvent;
      const isOutOfBounds =
        touchX < mXMin || touchX > mXMax || touchY < mYMin || touchY > mYMax;
      const isOutOfIconBounds =
        touchX < iXMin || touchX > iXMax || touchY < iYMin || touchY > iYMax;
      if (!isOutOfBounds || !isOutOfIconBounds) return false;
      this.mediator.notifyRequestDismiss();
      return true;
    };
  }
}

export { DropDownTouchOutHandler };
