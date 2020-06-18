import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import StudentSchoolEntity from '../entities/studentschool.entity';

@Injectable()
export default class SectionService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(StudentSchoolEntity) private readonly FixItFridayRepository: Repository<StudentSchoolEntity>,
  ) {}

  async findAll(): Promise<StudentSchoolEntity[]> {
    return this.FixItFridayRepository.find();
  }

  async findOneById(id: string): Promise<StudentSchoolEntity> {
    return this.FixItFridayRepository.findOne({ where: { studentschoolvkey: id } });
  }
}
