import type { SetStateAction, Dispatch } from 'react';
import type { GetGoalAction } from '@/application/GetGoalAction';
import { GoalNotFoundError } from '@/infrastructure/persistence/fake/GoalNotFoundError';
import { useState } from 'react';

type NumOrUndef = number | undefined;
type HhSs = [NumOrUndef, NumOrUndef];
type Action<S> = Dispatch<SetStateAction<S>>;
type UseStateReturnType<S> = [S, Action<S>];

function useGoal(
  getGoalAction: GetGoalAction
): [
  UseStateReturnType<HhSs>,
  UseStateReturnType<HhSs>,
  UseStateReturnType<number | undefined>
] {
  const [amInterval, setAmInterval] = useState<HhSs>([undefined, undefined]);
  const [pmInterval, setPmInterval] = useState<HhSs>([undefined, undefined]);
  const [volume, setVolume] = useState<NumOrUndef>(undefined);

  getGoalAction
    .execute()
    .then((g) => {
      const am = g.getAmTargetVoidInterval();
      const pm = g.getPmTargetVoidInterval();
      const intake = g.getTargetIntake().getValue();
      setAmInterval([am.getHours(), am.getMinutesWithinHour()]);
      setPmInterval([pm.getHours(), pm.getMinutesWithinHour()]);
      setVolume(intake);
    })
    .catch((e) => {
      if (!(e instanceof GoalNotFoundError)) throw e;
      // if GoalNotFoundError, use default values
    });

  return [
    [amInterval, setAmInterval],
    [pmInterval, setPmInterval],
    [volume, setVolume],
  ];
}

export { useGoal };
