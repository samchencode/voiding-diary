import type { TimerBuilder } from '@/domain/ports/TimerBuilder';

class GetTimerBuilderAction {
  builder: TimerBuilder;

  constructor(timerBuilder: TimerBuilder) {
    this.builder = timerBuilder;
  }

  async execute(): Promise<TimerBuilder> {
    await this.builder.init();
    return this.builder;
  }
}

export { GetTimerBuilderAction };
