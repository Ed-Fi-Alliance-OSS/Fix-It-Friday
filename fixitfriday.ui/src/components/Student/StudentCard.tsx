import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { StudentCardProps } from './types/StudentCardProps';
import ProfilePic from '../utilities/ProfilePic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AccessEnum } from './types/StudentClassType';

const StudentCard: FunctionComponent<StudentCardProps> = ({
  studentFirstName,
  studentLastName,
  studentSchoolKey,
  email,
  pictureurl,
  guardianInformation,
}) => {
  const BoldText = ({ text }: { text: string }) => <div style={{ fontWeight: 'bold' }}>{text}</div>;

  const AccessComponent = (access: Array<AccessEnum>) => {
    return (
      access && access.length > 0 ?
      <div>
        {access.includes(AccessEnum.GoogleClassroom) ? <FontAwesomeIcon icon={faGoogle} title="Has Google Classroom access" /> : ''}
        {access.includes(AccessEnum.Email) ? <FontAwesomeIcon icon={faEnvelope} title="Has email access" /> : ''}
        {access.includes(AccessEnum.Phone) ? <FontAwesomeIcon icon={faPhone} title="Has phone access" /> : ''}
        {access.includes(AccessEnum.Internet) ? <FontAwesomeIcon icon={faLaptop} title="Has Internet access" /> : ''}
      </div>: <></>
    );
  };

  return (
    <Card key={studentSchoolKey} className="student-card">
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
      <Card.Footer style={{ textAlign: 'right' }}>
        <div>
          <FontAwesomeIcon icon={faGoogle} title="Has access to Google Classroom" />
          &nbsp;
          <FontAwesomeIcon icon={faEnvelope} title="Has access to Email" />
          &nbsp;
          <FontAwesomeIcon icon={faPhone} title="Has phone access" />
          &nbsp;
          <FontAwesomeIcon icon={faLaptop} title="Has Internet access" />
          &nbsp;
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudentCard;
