import type { Timer } from '@/domain/models/Timer';
import type { TimerBuilder } from '@/domain/ports/TimerBuilder';

class GetTimerAction {
  builder: TimerBuilder;

  constructor(timerBuilder: TimerBuilder) {
    this.builder = timerBuilder;
  }

  async execute(): Promise<Timer> {
    await this.builder.init();
    this.builder.configure((b) => {
      b.configureIdleState((s) => {
        s.addOnStartListener(() => console.log('timer start!'));
      });
      b.configureTickingState((s) => {
        s.addOnFinishListener(() => console.log('timer done!'));
      });
    });
    return this.builder.build();
  }
}

export { GetTimerAction };
