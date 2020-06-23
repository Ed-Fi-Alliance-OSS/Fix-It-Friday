import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity({ schema: 'fif', name: 'surveysummarybysection', synchronize: false })
export default class SurveySummaryBySection {
  
  @ViewColumn() 
  sectionkey: string;

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
