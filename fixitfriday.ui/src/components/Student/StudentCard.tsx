import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';
import { StudentCardProps } from './types/StudentCardProps';

const StudentCard: FunctionComponent<StudentCardProps> = ({
  studentFirstName,
  studentLastName,
  studentSchoolKey,
  email,
}) => {
  return (
    <Card
      key={studentSchoolKey}
      style={{
        flex: '1',
        border: '1px solid #afafaf',
        minWidth: '18rem',
        maxWidth: '18rem',
        padding: '5px 5px 5px 5px',
        margin: '10px 10px 10px 10px',
      }}
    >
      <Card.Body style={{ display: 'flex' }}>
        <div
          style={{
            border: '1px solid black',
            margin: '2px 2px 2px 2px',
            marginRight: '2rem',
            height: '100px',
            minWidth: '70px',
          }}
        >
          <Card.Img alt={` Picture of ${studentFirstName} ${studentLastName}`} src="" />
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{`${studentFirstName} ${studentLastName}`}</div>
          <div>Student ID: {studentSchoolKey}</div>
          <div>{email}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
