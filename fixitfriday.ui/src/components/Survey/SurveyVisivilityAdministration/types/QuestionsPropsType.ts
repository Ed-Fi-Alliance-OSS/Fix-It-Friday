import { SurveyQuestionType } from '../../types/SurveyQuestionType';

export interface QuestionsPropsType {
  survey: Array<SurveyQuestionType>;
  disabled?: boolean;

  onHide?(): void;
}
