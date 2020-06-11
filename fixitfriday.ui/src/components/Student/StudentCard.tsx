import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { StudentCardProps } from './types/StudentCardProps';
import ProfilePic from '../utilities/ProfilePic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const BoldText = ({ text }: { text: string }) => <div style={{ fontWeight: 'bold' }}>{text}</div>;

type AccessesComponentProps = {
  googleClassroom: boolean;
  email: boolean;
  phone: boolean;
  internet: boolean;
};

const AccessesComponent: FunctionComponent<AccessesComponentProps> = ({ googleClassroom, email, phone, internet }) => {
  const spaceAfter = {paddingRight: '3px'};
  return (
    <div>
      {googleClassroom ? <FontAwesomeIcon icon={faGoogle} title="Has Google Classroom access" style={spaceAfter} /> : ''}
      {email ? <FontAwesomeIcon icon={faEnvelope} title="Has email access" style={spaceAfter} /> : ''}
      {phone ? <FontAwesomeIcon icon={faPhone} title="Has phone access" style={spaceAfter} /> : ''}
      {internet ? <FontAwesomeIcon icon={faLaptop} title="Has Internet access" style={spaceAfter} /> : ''}
    </div>
  );
};

const StudentCard: FunctionComponent<StudentCardProps> = ({
  studentFirstName,
  studentLastName,
  studentSchoolKey,
  email,
  pictureurl,
  guardianInformation,
  hasEmail,
  hasAccessToGoogleClassroom,
  hasInternetAccess,
  hasPhone,
}) => {
  return (
    <Card
      key={studentSchoolKey}
      style={{
        flex: '1',
        border: '1px solid #696969',
        minWidth: '19rem',
        padding: '5px 5px',
        marginTop: '10px',
      }}
    >
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
        <AccessesComponent
          googleClassroom={hasAccessToGoogleClassroom}
          email={hasEmail}
          phone={hasPhone}
          internet={hasInternetAccess}
        />
      </Card.Footer>
    </Card>
  );
};

export default StudentCard;
