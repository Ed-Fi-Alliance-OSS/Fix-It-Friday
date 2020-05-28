import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

interface ProfilePicProps {
  firstname: string;
  lastname: string;
  pictureUrl: string;
}

const ProfilePic: FunctionComponent<ProfilePicProps> = (props: ProfilePicProps) => {

    const addDefaultSrc = (ev : any) => {
        ev.target.src = ev.style.visibility = 'hidden';
    }

  return (
    <Card.Img
      style={{ width: 'auto', height: 'auto', minWidth: '100%' }}
      alt={` Picture of ${props.firstname} ${props.lastname}`}
      onError={ addDefaultSrc }
      src={ props.pictureUrl }
    />
  );
};

export default ProfilePic;
