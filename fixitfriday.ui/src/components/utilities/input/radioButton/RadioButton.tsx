import React from 'react';
import { Form } from 'react-bootstrap';
import { RadioButtonProps } from './RadioButtonTypes';

const RadioButton: React.FC<RadioButtonProps> = ({ inputLabel, inputName, options }) => {
  return (
    <Form.Group>
      <Form.Label>{inputLabel}</Form.Label>
      {options.map(({ radioLabel, value }) => (
        <Form.Check label={radioLabel} key={value} type="radio" name={inputName} />
      ))}
    </Form.Group>
  );
};

export default RadioButton;
