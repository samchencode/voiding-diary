import type { NotificationRepository } from '@/application/ports/NotificationRepository';
import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';
import { checkDateStale } from '@/application/services/timer/checkDateStale';
import { Notification } from '@/application/services/timer/SendsNotifications/Notification';
import { UsedBeforeReadyError } from '@/application/services/timer/UsedBeforeReadyError';
import type {
  Timer,
  TimerState,
  TimerStateBuilder,
} from '@/domain/models/Timer';

class SendsNotifications implements Timer {
  private timer: Timer;

  private id: string | null = null;

  private isReady = false;

  private repo: NotificationRepository;

  private scheduler: NotificationScheduler;

  private activeNotification: Notification | null = null;

  constructor(
    timer: Timer,
    repo: NotificationRepository,
    scheduler: NotificationScheduler
  ) {
    this.timer = timer;
    this.repo = repo;
    this.scheduler = scheduler;
    scheduler.setOnInteractionListener(() => this.onInteraction());
  }

  async init(): Promise<void> {
    this.configureBuilder();
    await this.loadSavedNotificationIfExists();
    await this.timer.init();
    this.isReady = true;
  }

  private async loadSavedNotificationIfExists() {
    const saved = await this.repo.getNotificationOrNull();
    if (saved === null) return;
    if (checkDateStale(saved.getNotifyAt())) {
      await this.repo.deleteNotification();
    } else {
      this.activeNotification = saved;
    }
  }

  private configureBuilder() {
    this.timer.configure((b) => {
      b.configureIdleState((s) =>
        s.addOnStartListener((endsAt) => this.onStart(endsAt))
      );
      b.configureTickingState((s) => {
        s.addOnRestartListener((endsAt) => this.onRestart(endsAt));
        s.addOnFinishListener(() => this.onFinish());
      });
    });
  }

  private async schedule(notifyAt: Date) {
    const id = await this.scheduler.schedule(notifyAt);
    const n = new Notification(id, notifyAt);
    await this.repo.setNotification(n);
    this.activeNotification = n;
  }

  private async cancel() {
    if (!this.activeNotification) return;
    await this.scheduler.cancel(this.activeNotification.getId());
    await this.repo.deleteNotification();
    this.activeNotification = null;
  }

  private async dismiss() {
    if (!this.activeNotification) return;
    await this.scheduler.dismiss(this.activeNotification.getId());
    await this.repo.deleteNotification();
    this.activeNotification = null;
  }

  private onStart(endsAt: Date) {
    if (this.activeNotification) return;
    this.schedule(endsAt);
  }

  private onRestart(endsAt: Date) {
    if (!this.activeNotification) {
      this.schedule(endsAt);
    } else {
      this.cancel().then(() => this.schedule(endsAt));
    }
  }

  private onFinish() {
    // only runs if app isnt backgrounded on finish...
    // or when the user returns to the app after finish
    // so this assumes that the UI is open
    if (!this.activeNotification) return;
    this.scheduler.dismiss(this.activeNotification.getId());
    this.cancel();
  }

  private onInteraction() {
    this.timer.start();
  }

  configure(cfg: (b: TimerStateBuilder, s: TimerState) => void): void {
    this.timer.configure(cfg);
  }

  async start(endsAt: Date): Promise<void> {
    if (!this.isReady) throw new UsedBeforeReadyError(this.constructor.name);
    await this.timer.start(endsAt);
  }
}

export { SendsNotifications };
