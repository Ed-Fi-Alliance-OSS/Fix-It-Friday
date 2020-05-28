import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from '@apollo/react-hooks';

import PageHeader from './pageHeader';
import GET_TEACHER_NAME_AND_SECTIONS from '../../GraphQl/teacher/teacherQueries';
import StudentRoster from '../Student/StudentRoster';
import { StudentClassType } from '../Student/types/StudentClassType';
import GET_STUDENTS_FOR_SECTION from '../../GraphQl/students/studentQueries';

const TeacherScreen: React.FunctionComponent = () => {
  const { loading: headerLoading, error: headerError, data: headerData } = useQuery(GET_TEACHER_NAME_AND_SECTIONS, {
    variables: { StaffKey: 1 },
  });

  const { loading: rosterLoading, error: rosterError, data: rosterData } = useQuery(GET_STUDENTS_FOR_SECTION, {
    variables: { key: '9' },
  });

  let Header = <p>Loading...</p>;
  if (headerLoading) {
    Header = <p>Loading...</p>;
  } else if (headerError) {
    Header = <p>An error has ocurred processing the request.</p>;
  } else {
    const teacherName = `${headerData.sectionsbystaff.firstname} ${headerData.sectionsbystaff.middlename} ${headerData.sectionsbystaff.lastsurname}`;
    Header = <PageHeader TeacherClass={headerData.sectionsbystaff.sections} TeacherName={teacherName} />;
  }

  let Detail = <p>Loading...</p>;
  if (rosterLoading) {
    Detail = <p>Loading...</p>;
  } else if (headerError) {
    Detail = <p>An error has ocurred processing the request.</p>;
  } else {
    let studentData: Array<StudentClassType> = rosterData.studentsbysection.map((c: any) => c.student);
    Detail = <StudentRoster students={studentData} />;
  }

  return (
    <div>
      <Row>
        <Col xs={12}>
          {Header}
          <hr />
        </Col>
      </Row>
      <div>{Detail}</div>
    </div>
  );
};

export default TeacherScreen;
