interface TimerState {
  start(endsAt?: Date): void;
  setDefaultInterval(ms: number): void;
}

export { TimerState };
