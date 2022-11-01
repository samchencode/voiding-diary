import { BackHandler } from 'react-native';
import type { NativeEventSubscription } from 'react-native';
import type { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';

class DropDownBackHandler {
  private subscription: NativeEventSubscription | null = null;

  private mediator: DropDownMediator;

  constructor(mediator: DropDownMediator) {
    this.handleBackPress = this.handleBackPress.bind(this);
    this.mediator = mediator;
  }

  private handleBackPress() {
    this.mediator.notifyRequestDismiss();
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
