import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';
import { SurveyQuestionsPropsType } from './types/SurveyQuestionsPropsType';
import { SurveyQuestionType } from '../types/SurveyQuestionType';
import Question from './Question';

const SurveyQuestions: FC<SurveyQuestionsPropsType> = ({ survey, surveyDisabled }: SurveyQuestionsPropsType) => {
  const questions =
    survey && survey.length > 0 ? (
      survey.map(({ id, question, disabled }: SurveyQuestionType) => (
        <Col key={id} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Question id={id} question={question} checked={!disabled} surveyDisabled={surveyDisabled} />
        </Col>
      ))
    ) : (
      <div />
    );

  return (
    <div hidden={!survey || survey.length === 0}>
      <Row>
        <Col>
          <h1>Questions</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>Uncheck to disable a question.</Col>
      </Row>
      <Row className="section-container">{questions}</Row>
    </div>
  );
};

export default SurveyQuestions;
