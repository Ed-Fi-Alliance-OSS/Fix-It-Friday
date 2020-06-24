import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';
import SurveySummaryAnsweres from './surveysummaryansweres.entity';
import SurveySummaryEntity from './surveysummary.entity';

@ViewEntity({ schema: 'fif', name: 'surveysummaryquestions', synchronize: false })
export default class SurveySummaryQuestionsEntity {
  
  @ViewColumn()
  surveykey: number;

  @ViewColumn()
  title: string;

  @PrimaryColumn()
  surveyquestionkey: number;

  @ViewColumn()
  question: string;

  answers?: SurveySummaryAnsweres[];
}
