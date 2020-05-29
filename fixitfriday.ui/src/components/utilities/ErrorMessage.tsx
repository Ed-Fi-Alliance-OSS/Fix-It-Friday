import React, { SFC } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage: SFC = ( ) => {
  return (
    <Alert variant={"danger"}>An error has ocurred processing the request.</Alert>
  );
};

export default ErrorMessage;
