import type { Timer } from '@/domain/models/Timer';
import type { TimerBuilder } from '@/domain/ports/TimerBuilder';
import type { ConfigureFunction } from '@/domain/ports/TimerBuilder/TimerBuilder';
import { UsedBeforeReadyError } from '@/infrastructure/timer/UsedBeforeReadyError';
import { Notifications } from '@/infrastructure/timer/SendsNotifications/Notifications';
import type { SerializedNotification } from '@/infrastructure/timer/SendsNotifications/NotificationStorage';
import { NotificationStorage } from '@/infrastructure/timer/SendsNotifications/NotificationStorage';

class SendsNotifications implements TimerBuilder {
  builder: TimerBuilder;

  notificationIdentifier: string | null = null;

  isReady = false;

  constructor(builder: TimerBuilder) {
    this.builder = builder;
    this.configureBuilder();
  }

  async init() {
    await this.builder.init();
    const saved = await NotificationStorage.getValueOrNull();
    this.handleSavedValue(saved);

    this.isReady = true;
  }

  private async saveIdentifier(notificationIdentifier: string, notifyAt: Date) {
    this.notificationIdentifier = notificationIdentifier;
    NotificationStorage.save(notificationIdentifier, notifyAt);
  }

  private async resetIdentifier() {
    this.notificationIdentifier = null;
    NotificationStorage.reset();
  }

  private async handleSavedValue(saved: SerializedNotification | null) {
    if (saved === null) return;
    const now = new Date();
    if (saved.notifyAt < now) await this.resetIdentifier();
    else this.notificationIdentifier = saved.notificationIdentifier;
  }

  private onStart(endsAt: Date) {
    // If a saved, non-stale notification identifer was loaded.
    if (this.notificationIdentifier) return;
    Notifications.schedule(endsAt).then(
      ({ notificationIdentifier, notifyAt }) => {
        this.saveIdentifier(notificationIdentifier, notifyAt);
      }
    );
  }

  private onRestart(endsAt: Date) {
    if (this.notificationIdentifier) {
      Notifications.cancel(this.notificationIdentifier)
        .then(() => this.resetIdentifier())
        .then(() => this.onStart(endsAt));
    } else {
      this.onStart(endsAt);
    }
  }

  private onFinish() {
    this.resetIdentifier();
    // TODO: Dismiss notifications & cancel notification w/ our identifer to cover our bases lol
  }

  private configureBuilder() {
    this.builder.configure((b) => {
      b.configureIdleState((s) => {
        s.addOnStartListener((endsAt) => this.onStart(endsAt));
      });
      b.configureTickingState((s) => {
        s.addOnRestartListener((endsAt) => this.onRestart(endsAt));
        s.addOnFinishListener(() => this.onFinish());
      });
    });
  }

  configure(fn: ConfigureFunction): void {
    this.builder.configure(fn);
  }

  build(): Timer {
    if (!this.isReady) throw new UsedBeforeReadyError('SendsNotifications');
    return this.builder.build();
  }
}

export { SendsNotifications };
