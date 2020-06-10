import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { StudentCardProps } from './types/StudentCardProps';
import ProfilePic from '../utilities/ProfilePic';

const StudentCard: FunctionComponent<StudentCardProps> = ({
  studentFirstName,
  studentLastName,
  studentSchoolKey,
  email,
  pictureurl,
  guardianInformation,
}) => {
  const BoldText = ({ text }: { text: string }) => <div style={{ fontWeight: 'bold' }}>{text}</div>;

  return (
    <Card key={studentSchoolKey} className={'student-card'}>
      <Card.Body>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 1,
            }}
          >
            <ProfilePic pictureUrl={pictureurl} />
          </div>
          <div style={{ flex: 4 }}>
            <Link to={`/student/${studentSchoolKey}`}>
              <BoldText text={`${studentFirstName} ${studentLastName}`} />
            </Link>
            <div>Student ID: {studentSchoolKey}</div>
            <div>{email}</div>
          </div>
        </div>
        <div>
          <BoldText text="Primary Guardian" />
          <BoldText text={`${guardianInformation.name} (${guardianInformation.relationship})`} />
          <div>{guardianInformation.email}</div>
          <div>{guardianInformation.phone}</div>
          <div>{guardianInformation.address}</div>
          <BoldText text="Preferred Contact Method" />
          <div>{guardianInformation.preferredContactMethod}</div>
          <BoldText text="Best time to Contact" />
          <div>{guardianInformation.bestTimeToContact}</div>
          <BoldText text="Contact Notes" />
          <div>{guardianInformation.contactNotes}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
