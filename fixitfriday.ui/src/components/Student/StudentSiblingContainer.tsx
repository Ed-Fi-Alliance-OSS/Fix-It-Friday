import React, { FunctionComponent } from 'react';
import { Media } from 'react-bootstrap';
import { StudentDetailSiblingType } from './types/StudentDetailSiblingType';
import ProfilePic from '../utilities/ProfilePic';

const StudentSiblingContainer: FunctionComponent<StudentDetailSiblingType> = ({
  firstName,
  lastName,
  gradeLevel,
  school,
  pictureurl,
}) => {
  return (
    <Media className="student-card">
      <Media.Body>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 1,
            }}
          >
            <ProfilePic pictureUrl={pictureurl} />
          </div>
          <div style={{ flex: 4 }}>
            {`${firstName} ${lastName}`}
            <br />
            {gradeLevel}
            <br />
            {school}
          </div>
        </div>
      </Media.Body>
    </Media>
  );
};

export default StudentSiblingContainer;
