import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ContactPersonEntity from '../entities/contactperson.entity';
import SchoolEntity from '../entities/school.entity';
import StudentSchoolEntity from '../entities/studentschool.entity';
import StudentContactEntity from '../entities/studentcontact.entity';
import StudentSurveyEntity from '../entities/survey/studentsurvey.entity';
import StudentNoteEntity from '../entities/studentnote.entity';

@Injectable()
export default class SectionService {
  fatherText = 'Father';

  motherText = 'Mother';

  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(StudentSchoolEntity) private readonly FixItFridayRepository: Repository<StudentSchoolEntity>,
    @InjectRepository(ContactPersonEntity) private readonly FixItFridayRepositoryContacts: Repository<ContactPersonEntity>,
    @InjectRepository(SchoolEntity) private readonly FixItFridayRepositorySchool: Repository<SchoolEntity>,
    @InjectRepository(StudentSurveyEntity)
    private readonly FixItFridayStudentSurveyRepository: Repository<StudentSurveyEntity>,
    @InjectRepository(StudentNoteEntity) private readonly FixItFridayStudentNotesRepository: Repository<StudentNoteEntity>,
  ) {}

  async findAll(): Promise<StudentSchoolEntity[]> {
    return this.FixItFridayRepository.find();
  }

  async findAllBySection(id: string): Promise<StudentSchoolEntity[]> {
    return this.FixItFridayRepository.createQueryBuilder('section')
      .leftJoin(StudentSchoolEntity, 'ss', 'ss.sectionkey = section.sectionkey')
      .leftJoinAndSelect('section.students', 'student', 'student.studentschoolkey = ss.studentschoolkey')
      .where({ sectionkey: id })
      .getMany();
  }

  async findOneById(id: string): Promise<StudentSchoolEntity> {
    return this.FixItFridayRepository.findOne({ where: { studentschoolkey: id } });
  }

  async findStudentContactsById(studentschoolkey: string): Promise<ContactPersonEntity[]> {
    return this.FixItFridayRepositoryContacts.createQueryBuilder('contactperson')
      .leftJoin(
        StudentContactEntity,
        'sc',
        `contactperson.uniquekey = sc.contactkey and sc.studentschoolkey='${studentschoolkey}'`,
      )
      .getMany();
  }

  async findStudentsSiblings(studentschoolkey: string): Promise<StudentSchoolEntity[]> {
    return this.FixItFridayRepository.createQueryBuilder('students')
      .innerJoin(
        StudentContactEntity,
        'siblingcontact',
        `students.studentschoolkey = siblingcontact.studentschoolkey and siblingcontact.studentschoolkey NOT IN ('${studentschoolkey}')`,
      )
      .innerJoin(
        ContactPersonEntity,
        'cpsibling',
        `cpsibling.uniquekey = siblingcontact.contactkey and students.studentkey=cpsibling.studentkey`,
      )
      .innerJoin(ContactPersonEntity, 'cpcurrentstudent', `cpcurrentstudent.contactpersonkey = cpsibling.contactpersonkey`)
      .innerJoin(
        StudentContactEntity,
        'currentstudentcontact',
        `currentstudentcontact.studentschoolkey = '${studentschoolkey}' AND cpcurrentstudent.uniquekey = currentstudentcontact.contactkey`,
      )
      .where(
        `(cpcurrentstudent.RelationshipToStudent like :father or cpcurrentstudent.RelationshipToStudent like :mother) AND (cpsibling.RelationshipToStudent like :father or cpsibling.RelationshipToStudent like :mother)`,
        { father: `${this.fatherText}%`, mother: `${this.motherText}%` },
      )
      .getMany();
  }

  async findOneSchoolByStudent(id: string): Promise<SchoolEntity> {
    return this.FixItFridayRepositorySchool.findOne({ where: { schoolkey: id } });
  }

  async findByStudentSchoolKey(studentschoolkey: string): Promise<StudentSurveyEntity[]> {
    return this.FixItFridayStudentSurveyRepository.createQueryBuilder('studentsurvey')
      .innerJoin(
        StudentSchoolEntity,
        'ss',
        `studentsurvey.studentschoolkey = ss.studentschoolkey and ss.studentschoolkey='${studentschoolkey}'`,
      )
      .where({ studentschoolkey })
      .getMany();
  }

  async findStudentNotesByStudentSchoolKey(studentschoolkey: string): Promise<StudentNoteEntity[]> {
    return this.FixItFridayStudentNotesRepository.createQueryBuilder('studentnotes')
      .innerJoin(
        StudentSchoolEntity,
        'ss',
        `studentnotes.studentschoolkey = ss.studentschoolkey and ss.studentschoolkey='${studentschoolkey}'`,
      )
      .where({ studentschoolkey })
      .getMany();
  }
}
