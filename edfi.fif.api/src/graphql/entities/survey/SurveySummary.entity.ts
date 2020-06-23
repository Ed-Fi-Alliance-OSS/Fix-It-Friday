import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity({ schema: 'fif', name: 'surveysummary', synchronize: false })
export default class SurveySummary {

  @PrimaryColumn()
  surveykey: string;

  @ViewColumn()
  title: string;

  @ViewColumn()
  studentsanswered: number;

  @ViewColumn()
  numberofquestions: number;

  @ViewColumn()
  totalstudents: number;
}
