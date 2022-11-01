import { BackHandler } from 'react-native';
import type { NativeEventSubscription } from 'react-native';
import type { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';

class DropDownBackHandler {
  private onRequestDimiss: () => void;

  private subscription: NativeEventSubscription | null = null;

  private mediator: DropDownMediator;

  constructor(mediator: DropDownMediator, onRequestDismiss: () => void) {
    this.handleBackPress = this.handleBackPress.bind(this);
    this.onRequestDimiss = onRequestDismiss;
    this.mediator = mediator;
    this.mediator.setBackHandler(this);
  }

  private handleBackPress() {
    this.onRequestDimiss();
    return true;
  }

  subscribe() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  unsubscribe() {
    this.subscription?.remove();
    this.subscription = null;
  }

  hasSubscription() {
    return !!this.subscription;
  }
}

export { DropDownBackHandler };
