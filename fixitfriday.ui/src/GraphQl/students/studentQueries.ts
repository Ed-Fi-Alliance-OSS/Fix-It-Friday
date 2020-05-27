import gql from 'graphql-tag';

const GET_STUDENTS_FOR_SECTION = gql`
query StudentsBySection($sectionKey: String) {
    studentsbysection(sectionkey: $sectionKey) {
      sectionkey
      studentschoolkey
      studentsectionkey
      teachername
      student {
        studentfirstname
        studentmiddlename
        studentlastname
        contacts {
          contact {
            contactfirstname
            contactlastname
            relationshiptostudent
            isprimarycontact
          }
        }
      }
    }
  }
`;

export default GET_STUDENTS_FOR_SECTION