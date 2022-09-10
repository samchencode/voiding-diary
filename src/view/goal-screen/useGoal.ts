import { useState, useMemo, useEffect } from 'react';
import type { SetStateAction, Dispatch } from 'react';
import type { GetGoalAction } from '@/application/GetGoalAction';
import { GoalNotFoundError } from '@/domain/ports/GoalRepository';
import type { Goal } from '@/domain/models/Goal';
import type { HhMmOrUndef, NumOrUndef } from '@/view/goal-screen/types';

type Action<S> = Dispatch<SetStateAction<S>>;
type UseStateReturnType<S> = [S, Action<S>];

function useGoal(
  getGoalAction: GetGoalAction
): [
  UseStateReturnType<NumOrUndef>,
  UseStateReturnType<HhMmOrUndef>,
  UseStateReturnType<HhMmOrUndef>,
  [Goal | null, Action<Goal | null>, () => Promise<Goal>]
] {
  const [amInterval, setAmInterval] = useState<HhMmOrUndef>([
    undefined,
    undefined,
  ]);
  const [pmInterval, setPmInterval] = useState<HhMmOrUndef>([
    undefined,
    undefined,
  ]);
  const [volume, setVolume] = useState<NumOrUndef>(undefined);
  const [savedGoal, setSavedGoal] = useState<Goal | null>(null);

  const getAndSetSavedGoal = useMemo(
    () => () =>
      getGoalAction.execute().then((g) => {
        setSavedGoal(g);
        return g;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getAndSetSavedGoal()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    [volume, setVolume],
    [amInterval, setAmInterval],
    [pmInterval, setPmInterval],
    [savedGoal, setSavedGoal, getAndSetSavedGoal],
  ];
}

export { useGoal };
