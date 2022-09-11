import { VolumeInOz } from '@/domain/models/Volume';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { Goal } from '@/domain/models/Goal';
import type { NumOrUndef, HhMmOrUndef, HhMm } from '@/view/goal-screen/types';
import { FieldEmptyError } from '@/view/goal-screen/FieldEmptyError';

function makeGoal(volume: number, amInterval: HhMm, pmInterval: HhMm) {
  const intake = new VolumeInOz(volume);
  const intervals = {
    am: TimeInMins.fromHoursAndMinutes(amInterval[0], amInterval[1]),
    pm: TimeInMins.fromHoursAndMinutes(pmInterval[0], pmInterval[1]),
  };
  return new Goal(intake, intervals);
}

const checkHhMmIsDefined = (i: HhMmOrUndef): i is HhMm =>
  typeof i[0] !== 'undefined' && typeof i[1] !== 'undefined';

function checkUndefAndMakeGoal(
  volume: NumOrUndef,
  amInterval: HhMmOrUndef,
  pmInterval: HhMmOrUndef
) {
  if (
    typeof volume === 'undefined' ||
    !checkHhMmIsDefined(amInterval) ||
    !checkHhMmIsDefined(pmInterval)
  ) {
    throw new FieldEmptyError();
  }

  return makeGoal(volume, amInterval, pmInterval);
}

function checkAllFieldsFilled(
  volume: NumOrUndef,
  amInterval: HhMmOrUndef,
  pmInterval: HhMmOrUndef
) {
  return ![amInterval, pmInterval, volume].flat().includes(undefined);
}

function checkFieldsEqualToSavedGoal(
  volume: number,
  amInterval: HhMm,
  pmInterval: HhMm,
  savedGoal: Goal | null
) {
  if (!savedGoal) return false;
  const goal = makeGoal(volume, amInterval, pmInterval);
  return savedGoal.is(goal);
}

function checkSubmittable(
  volume: NumOrUndef,
  amInterval: HhMmOrUndef,
  pmInterval: HhMmOrUndef,
  savedGoal: Goal | null
) {
  if (!checkAllFieldsFilled(volume, amInterval, pmInterval)) return false;
  const fieldsEqualToSavedValue = checkFieldsEqualToSavedGoal(
    volume as number,
    amInterval as HhMm,
    pmInterval as HhMm,
    savedGoal
  );
  return fieldsEqualToSavedValue === false;
}

export { checkUndefAndMakeGoal, checkSubmittable };
