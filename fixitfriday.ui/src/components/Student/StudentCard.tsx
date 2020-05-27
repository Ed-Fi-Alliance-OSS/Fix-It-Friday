import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

interface StudentCardProps {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
}

const StudentCard: FunctionComponent<StudentCardProps> = (props: StudentCardProps) => {
  return (
    <Card
      style={{
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
            flex: '1 0 70px',
            border: '1px solid black',
            margin: '2px 2px 2px 2px',
            marginRight: '2rem',
            height: '100px',
            minWidth: '70px',
          }}
        >
          <Card.Img alt={` Picture of ${props.firstName} ${props.lastName}`} src="" />
        </div>
        <div style={{ flex: '1' }}>
          <div style={{ fontWeight: 'bold' }}>{`${props.firstName} ${props.lastName}`}</div>
          <div>Student ID: {props.studentId}</div>
          <div>{props.email}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
