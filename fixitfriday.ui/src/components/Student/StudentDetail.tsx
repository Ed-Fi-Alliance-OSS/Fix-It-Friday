import React, { FunctionComponent, useState, useEffect } from 'react';
import { StudentDetailGuardianType } from './types/StudentDetailGuardianType';
import { StudentDetailType } from './types/StudentDetailTypes';
import StudentGuardianContainer from './StudentGuardianContainer';
import allStudents from './mockData/mockedStudents';
import ErrorMessage from '../utilities/ErrorMessage';
import { StudentDetailProps } from './StudentDetailProps';
import { Container, Row, Col, CardDeck, Card } from 'react-bootstrap';
import ProfilePic from '../utilities/ProfilePic';

const StudentDetail: FunctionComponent<StudentDetailProps> = ({ match }) => {
  const [student, setStudent] = useState<StudentDetailType | undefined>(undefined);

  let header = {
    padding: '25px 10px',
  };

  let studentContainer = {

  };

  let studentCard = {
    padding: '10px 10px',
    margin: '12px 12px',
  };

  let surveyStyle = {
    padding: '25px 12px',

  };

  useEffect(() => {
    const ourStudent = allStudents.filter((s) => s.id === match.params.id)[0];
    setStudent(ourStudent);
  }, [match.params.id]);

  return student && student !== undefined ? (
    <Container fluid>
      <Row style={header}>
        <Col>
          <h1>{`Student Detail - ${student.firstName} ${student.lastName}`}</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col sm={4} style={studentContainer}>
          <Card
            key={student.id}
            style={{
              flex: '1',
              border: '1px solid #696969',
              minWidth: '21rem',
              maxWidth: '21rem',
              padding: '5px 5px',
              margin: '10px 10px',
            }}
          >
            <Card.Body style={{ display: 'flex' }}>
              <div
                style={{
                  flex: 1,
                  margin: '2px 2em 2px 2px',
                  minWidth: '70px',
                }}
              >
                <ProfilePic pictureUrl={student.pictureurl} />
              </div>
              <div style={{ flex: 4 }}>
                <div>{student.email}</div>
                <div>Student ID: {student.id}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <CardDeck>
            {student.guardians.map((value: StudentDetailGuardianType) => (
              <StudentGuardianContainer
                key={value.id}
                id={value.id}
                firstName={value.firstName}
                lastName={value.lastName}
                phone={value.phone}
                address={value.address}
                pictureurl={value.pictureurl}
              />
            ))}
          </CardDeck>
        </Col>
      </Row>
      <Row style={surveyStyle}>
        <Col>THIS IS TEXT FOR THE SURVEY</Col>
      </Row>
    </Container>
  ) : (
    <ErrorMessage message={`There is no student with an ID of '${match.params.id}'`} />
  );
};

export default StudentDetail;
