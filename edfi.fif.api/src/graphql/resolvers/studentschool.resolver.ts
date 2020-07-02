import { Parent, Args, Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { StudentSchool, ContactPerson, StudentSurvey, StudentNote } from '../graphql.schema';
import StudentSchoolService from '../services/studentschool.service';

@Resolver('StudentSchool')
export default class StudentSchoolResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly studentschoolService: StudentSchoolService) {}

  @Query()
  async students(): Promise<StudentSchool[]> {
    return this.studentschoolService.findAll();
  }

  @Query('student')
  async findOneById(
    @Args('studentschoolkey')
    studentschoolkey: string,
  ): Promise<StudentSchool> {
    return this.studentschoolService.findOneById(studentschoolkey);
  }

  @ResolveProperty('contacts')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async contacts(@Parent() parent): Promise<ContactPerson[]> {
    return this.studentschoolService.findStudentContactsById(parent.sectionkey);
  }

  @ResolveProperty('siblingscount')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async siblingscount(@Parent() parent): Promise<number> {
    const studentList = this.studentschoolService.findStudentsSiblings(parent.studentschoolkey);
    return studentList && studentList !== undefined ? (await studentList).length : 0;
  }

  @ResolveProperty('siblings')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async siblings(@Parent() parent): Promise<ContactPerson[]> {
    return this.studentschoolService.findStudentsSiblings(parent.studentschoolkey);
  }

  @ResolveProperty('studentsurveys')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async studentsurveys(@Parent() parent): Promise<StudentSurvey[]> {
    return this.studentschoolService.findByStudentSchoolKey(parent.studentschoolkey);
  }

  @ResolveProperty('notes')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async studentnotes(@Parent() parent): Promise<StudentNote[]> {
    return this.studentschoolService.findStudentNotesByStudentSchoolKey(parent.studentschoolkey);
  }
}
