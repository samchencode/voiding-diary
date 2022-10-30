import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { NativeEventSubscription } from 'react-native';

export function useBackHandler(
  onPressOut: (() => void) | undefined,
  visible: boolean
) {
  const [backHandlerSubscription, setBackHandlerSubscription] =
    useState<NativeEventSubscription | null>(null);

  const handleBackPress = React.useCallback(() => {
    if (onPressOut) onPressOut();
    return true;
  }, [onPressOut]);

  useEffect(() => {
    if (visible && !backHandlerSubscription) {
      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
      setBackHandlerSubscription(sub);
    } else if (!visible && backHandlerSubscription) {
      backHandlerSubscription.remove();
      setBackHandlerSubscription(null);
    }
  }, [backHandlerSubscription, handleBackPress, visible]);
}
