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

  handleFocus(menuRectangle: LayoutRectangle) {
    this.handler = this.makeHandler(menuRectangle);
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

  private makeHandler({ pageX: x, pageY: y, width, height }: LayoutRectangle) {
    const [xMin, yMin, xMax, yMax] = [x, y, x + width, y + height];
    const [iXMin, iYMin, iXMax, iYMax] = [xMax - 48, y - 48, xMax, y];

    return (evt: GestureResponderEvent) => {
      const { pageX: touchX, pageY: touchY } = evt.nativeEvent;
      const isOutOfBounds =
        touchX < xMin || touchX > xMax || touchY < yMin || touchY > yMax;
      // TODO: Get this from icon measurement...
      const isOutOfIconBounds =
        touchX < iXMin || touchX > iXMax || touchY < iYMin || touchY > iYMax;
      if (!isOutOfBounds || !isOutOfIconBounds) return false;
      this.mediator.notifyRequestDismiss();
      return true;
    };
  }
}

export { DropDownTouchOutHandler };
