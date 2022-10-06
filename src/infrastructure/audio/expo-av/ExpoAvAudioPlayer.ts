/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { AudioPlayer } from '@/application/ports/AudioPlayer';
import { ExpoAvPlaybackError } from '@/infrastructure/audio/expo-av/ExpoAvPlaybackError';
import type {
  AVPlaybackStatus,
  AVPlaybackStatusError,
  AVPlaybackStatusSuccess,
} from 'expo-av';
import { Audio } from 'expo-av';

function isSuccessStatus(s: AVPlaybackStatus): s is AVPlaybackStatusSuccess {
  if ('didJustFinish' in s) return true;
  return false;
}

function isErrorStatus(s: AVPlaybackStatus): s is AVPlaybackStatusError {
  if ('error' in s) return true;
  return false;
}

class ExpoAvAudioPlayer implements AudioPlayer {
  // eslint-disable-next-line class-methods-use-this
  async playAlertSound(): Promise<void> {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/alert.mp3')
    );
    sound.setOnPlaybackStatusUpdate((s: AVPlaybackStatus) => {
      if (isErrorStatus(s)) throw new ExpoAvPlaybackError(s.error);
      if (!isSuccessStatus(s)) return;
      if (!s.didJustFinish) return;
      sound.unloadAsync();
    });
    await sound.playAsync();
  }
}

export { ExpoAvAudioPlayer };
