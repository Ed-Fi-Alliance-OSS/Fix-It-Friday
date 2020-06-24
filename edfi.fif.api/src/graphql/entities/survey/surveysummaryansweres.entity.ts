import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';
import SurveySummaryQuestionsEntity from './surveysummaryquestions.entity';

@ViewEntity({ schema: 'fif', name: 'surveysummaryansweres', synchronize: false })
export default class SurveySummaryAnsweresEntity {
  
  @ViewColumn() 
  sectionkey: number;

  @PrimaryColumn()
  surveykey: number;

  @ViewColumn()
  title: string;

  @ViewColumn()
  surveyquestionkey: number;

  @ViewColumn()
  question: string;

  @ViewColumn()
  studentschoolkey: number;

  @ViewColumn()
  studentname: string;
  
  @ViewColumn()
  answer: string;
}
