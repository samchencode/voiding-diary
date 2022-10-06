import type { GetTimerAction } from '@/application/GetTimerAction';
import type { TimeInMins } from '@/domain/models/TimeInMins';
import type { Timer } from '@/domain/models/Timer';
import { useEffect, useState } from 'react';

function useTimer(
  action: GetTimerAction,
  amInterval: TimeInMins | null
): [Timer | undefined, number, number] {
  const [timeTotal, setTimeTotal] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timer, loadTimer] = useState<Timer>();

  useEffect(() => {
    action.execute().then((t) => {
      t.configure((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener((endsAt) => {
            setTimeTotal(endsAt.getTime() - Date.now());
          });
        });
        b.configureTickingState((s) => {
          s.addOnRestartListener((endsAt) => {
            setTimeTotal(endsAt.getTime() - Date.now());
          });
          s.addOnTickListener((ms) => {
            setTimeRemaining(ms);
          });
          s.addOnFinishListener(() => {
            setTimeRemaining(0);
          });
        });
      });
      loadTimer(t);
    });
  }, [action]);

  useEffect(() => {
    timer?.configure(
      (b) =>
        amInterval &&
        b.setDefaultInterval(amInterval.getMinutesTotal() * 60 * 1000)
    );
  }, [timer, amInterval]);

  return [timer, timeRemaining, timeTotal];
}

export { useTimer };
