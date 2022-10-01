import type { GetTimerAction } from '@/application/GetTimerAction';
import type { Timer } from '@/domain/models/Timer';
import { useEffect, useState } from 'react';

function useTimer(action: GetTimerAction): [Timer | undefined, number, number] {
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

  return [timer, timeRemaining, timeTotal];
}

export { useTimer };
