import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { QuestionPropsType } from './types/QuestionPropsType';

const Question: FC<QuestionPropsType> = ({ id, question, checked, surveyDisabled }) => {
  const [questionChecked, setCheckedVisible] = React.useState(checked);
  const updateDisabled = () => setCheckedVisible(!questionChecked);

  return (
    <div className="form-check" key={id}>
      <Form>
        <Form.Check
          type="switch"
          id={question}
          label={question}
          checked={questionChecked}
          onChange={updateDisabled}
          disabled={!surveyDisabled}
        />
      </Form>
    </div>
  );
};

export default Question;
