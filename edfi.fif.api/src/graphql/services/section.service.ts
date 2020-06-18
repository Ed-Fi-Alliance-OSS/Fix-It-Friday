import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SectionEntity from '../entities/section.entity';
import StudentSectionEntity from '../entities/studentsection.entity';
import StudentsEntity from '../entities/studentschool.entity';

@Injectable()
export default class SectionService {
  // eslint-disable-next-line no-useless-constructor
  constructor(@InjectRepository(SectionEntity) private readonly FixItFridayRepository: Repository<SectionEntity>) {}

  async findAll(): Promise<SectionEntity[]> {
    return this.FixItFridayRepository.createQueryBuilder('section')
      .leftJoin(StudentSectionEntity, 'ss', 'ss.sectionkey = section.sectionkey')
      .leftJoinAndMapMany('section.students', StudentsEntity, 'student', 'student.studentschoolkey = ss.studentschoolkey')
      .getMany();
  }

  async findOneById(id: string): Promise<SectionEntity> {
    return this.FixItFridayRepository.createQueryBuilder('section')
      .leftJoin(StudentSectionEntity, 'ss', 'ss.sectionkey = section.sectionkey')
      .leftJoinAndMapMany('section.students', StudentsEntity, 'student', 'student.studentschoolkey = ss.studentschoolkey')
      .where({ sectionkey: id })
      .getOne();
  }
}
