import { SurveyQuestionType } from '../../types/SurveyQuestionType';

export interface SurveyQuestionsPropsType {
  survey: Array<SurveyQuestionType>;
  disabled?: boolean;

  onHide?(): void;
}
