import React, { FC } from 'react';
import { CardDeck } from 'react-bootstrap';
import StudentCard from './StudentCard';
import { StudentClassType } from './types/StudentClassType';
import { StudentRosterProps } from './types/StudentRosterProps';

const StudentRoster: FC<StudentRosterProps> = (props: StudentRosterProps) => {
  const students = props.students;

  const deck =
    students && students.length > 0 ? (
      students.map((s: StudentClassType, i: Number) => (
        <CardDeck className={ "studentCard" } key={s.studentschoolkey} style={{ display: 'flex', flexDirection: 'row' }}>
          <StudentCard
            key={s.studentschoolkey}
            studentSchoolKey={s.studentschoolkey}
            studentFirstName={s.studentfirstname}
            studentLastName={s.studentlastname}
            email={'TODO: NO EMAIL YET'}
          />
        </CardDeck>
      ))
    ) : (
      <div></div>
    );

  return <React.Fragment>{deck}</React.Fragment>;
};

export default StudentRoster;
