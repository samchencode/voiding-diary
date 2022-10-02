/* eslint-disable class-methods-use-this */
import type { Vibrator } from '@/application/ports/Vibrator';

class SpyVibrator implements Vibrator {
  constructor(spies: Partial<Vibrator>) {
    Object.assign(this, spies);
  }

  vibrate(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { SpyVibrator };
