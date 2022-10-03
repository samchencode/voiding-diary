import { DateAndTime } from '@/domain/models/DateAndTime';
import type { Record } from '@/domain/models/Record';
import { IntakeRecord, RecordId, VoidRecord } from '@/domain/models/Record';
import { Report } from '@/domain/models/Report/Report';
import { VolumeInOz } from '@/domain/models/Volume';
import { EjsReportFormatter } from '@/infrastructure/report-formatter/ejs/EjsReportFormatter';

async function fakeGetTemplates() {
  return {
    layout: `<body>
  <%_ for(record of report.getRecords()) { _%>
  <%- formatRecord(record) %>
  <%_ } _%>
</body>`,
    row: '<h2><%= title %></h2>',
  };
}

describe('EjsReportFormatter', () => {
  describe('Instantiation', () => {
    it('should create new formatter given template retriever', () => {
      const create = () => new EjsReportFormatter(fakeGetTemplates);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    let records: Record[];
    let report: Report;

    beforeEach(() => {
      records = [
        new VoidRecord(
          new DateAndTime(new Date(0)),
          new VolumeInOz(2),
          new RecordId('0')
        ),
        new IntakeRecord(
          new DateAndTime(new Date(1)),
          new VolumeInOz(2),
          new RecordId('1')
        ),
      ];
      report = new Report(records);
    });

    it('should create html formatted report', async () => {
      const formatter = new EjsReportFormatter(fakeGetTemplates);
      const html = await formatter.format(report);
      const expected = `<body>
  <h2>Void</h2>
  <h2>Intake</h2>
</body>`;
      expect(html).toBe(expected);
    });
  });
});
