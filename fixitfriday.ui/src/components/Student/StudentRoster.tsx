import React, { FC } from 'react';
import { CardDeck } from 'react-bootstrap';
import StudentCard from './StudentCard';
import { StudentClassType } from "./types/StudentClassType";
import { StudentRosterProps } from "./types/StudentRosterProps";

const StudentRoster: FC<StudentRosterProps> = (props: StudentRosterProps) => {
  const students = props.students;

  const deck =
    students && students.length > 0 ? (
      students.map((student: StudentClassType) => (
        <CardDeck style={{ alignItems: 'flex-start', justifyContent: 'space-around' }}>
          <StudentCard
            studentSchoolKey={student.studentSchoolKey}
            studentFirstName={student.studentFirstName}
            studentLastName={student.studentLastName}
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
