import type { Timer } from '@/domain/models/Timer';
import type { TimerBuilder } from '@/domain/ports/TimerBuilder';
import type { ConfigureFunction } from '@/domain/ports/TimerBuilder/TimerBuilder';
import { UsedBeforeReadyError } from '@/infrastructure/timer/UsedBeforeReadyError';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@timer-ends-at';

function onStart(endsAt: Date) {
  const endsAtMs = endsAt.getTime();
  AsyncStorage.setItem(STORAGE_KEY, endsAtMs.toString());
}

function onFinish() {
  AsyncStorage.removeItem(STORAGE_KEY);
}

class SavesEndTime implements TimerBuilder {
  private isReady = false;

  private builder: TimerBuilder;

  private existingEndDate: Date | null = null;

  constructor(builder: TimerBuilder) {
    this.builder = builder;
    this.configureBuilder();
  }

  async init() {
    await this.builder.init();
    await this.getSavedTimerDataOrNull();
    if (this.existingEndDate) {
      await this.removeDateIfStale();
    }
    this.isReady = true;
  }

  private async getSavedTimerDataOrNull() {
    const savedValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedValue === null) {
      this.existingEndDate = null;
    } else {
      const endsAtMs = Number.parseInt(savedValue, 10);
      this.existingEndDate = new Date(endsAtMs);
    }
  }

  private async removeDateIfStale() {
    const now = new Date();
    if (this.existingEndDate && this.existingEndDate < now) {
      this.existingEndDate = null;
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  }

  private configureBuilder() {
    this.builder.configure((b) => {
      b.configureIdleState((s) => {
        s.addOnStartListener((endsAt) => onStart(endsAt));
      });

      b.configureTickingState((s) => {
        s.addOnFinishListener(() => onFinish());
      });
    });
  }

  configure(fn: ConfigureFunction): void {
    this.builder.configure(fn);
  }

  build(): Timer {
    if (!this.isReady) throw new UsedBeforeReadyError('SavesEndTime');
    const timer = this.builder.build();
    if (this.existingEndDate) {
      timer.start(this.existingEndDate);
    }
    return timer;
  }
}

export { SavesEndTime };
