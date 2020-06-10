export type RadioButtonOption = {
  radioLabel: string;
  value: string;
};

export type RadioButtonProps = {
  options: Array<RadioButtonOption>;
  inputLabel: string;
  inputName: string;
};
