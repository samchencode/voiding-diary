import { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord } from '@/domain/models/IntakeRecord';
import { VolumeInMl } from '@/domain/models/Volume';

describe('IntakeRecord', () => {
  describe('Instantiation', () => {
    it('should create an intake record', () => {
      const datetime = new DateAndTime(new Date(0));
      const intakeVolume = new VolumeInMl(2);
      const create = () => new IntakeRecord(datetime, intakeVolume);
      expect(create).not.toThrowError();
    });
  });
});
