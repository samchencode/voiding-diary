/* eslint-disable class-methods-use-this */
import type { AudioPlayer } from '@/application/ports/AudioPlayer';

class SpyAudioPlayer implements AudioPlayer {
  constructor(spies: Partial<AudioPlayer>) {
    Object.assign(this, spies);
  }

  playAlertSound(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { SpyAudioPlayer };
