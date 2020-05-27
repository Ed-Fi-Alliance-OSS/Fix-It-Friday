import React, { FunctionComponent } from 'react';
import { CardDeck } from 'react-bootstrap';
import StudentCard from './StudentCard';
import { useQuery } from "@apollo/react-hooks";
import GET_STUDENTS_FOR_SECTION from "../../GraphQl/students/studentQueries";

interface StudentRosterProps {
  sectionKey: number;
}

const StudentRoster: FunctionComponent<StudentRosterProps> = (props: StudentRosterProps) => {

  // variables: sectionKey = [props.sectionKey]
  const { loading, error, data } = useQuery(GET_STUDENTS_FOR_SECTION, {
    variables: { sectionKey: "9" }
  });

  if(loading) {
    return (<div>Loading...</div>);
  }
  if(error || !data) {
    return (<div>Error...</div>);
  }

  return (
    data && data.studentsbysection ?
    data.studentsbysection.map((student: any) => (
      <CardDeck style={{ alignItems: 'flex-start', justifyContent: 'space-around' }}>
        <StudentCard studentId={ student.studentSchoolKey } firstName={ student.studentFirstName } lastName={student.studentLastName } email={'TODO: NO EMAIL YET' } />
      </CardDeck>)) : 
      <div>There are no students for this section.</div>
  );
};

export default StudentRoster;
