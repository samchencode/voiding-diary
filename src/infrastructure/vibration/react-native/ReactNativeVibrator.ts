import { Vibration } from 'react-native';
import type { Vibrator } from '@/application/ports/Vibrator';

class ReactNativeVibrator implements Vibrator {
  // eslint-disable-next-line class-methods-use-this
  async vibrate(): Promise<void> {
    const ONE_SECOND = 1000;
    // Android: wait 0s, vibrate 1s, wait 0.33s, vibrate 1s
    // IOS: wait 0s, vibrate, wait 1s, vibrate, wait 0.33s, vibrate, wait 1s
    const PATTERN = [0, ONE_SECOND, 0.33 * ONE_SECOND, ONE_SECOND];
    Vibration.vibrate(PATTERN);
  }
}

export { ReactNativeVibrator };
