import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SectionEntity from '../entities/section.entity';
import StaffEntity from '../entities/staff.entity';
import StaffSectionAssociationEntity from '../entities/staffsectionassociation.entity';

@Injectable()
export default class StaffService {
  // eslint-disable-next-line no-useless-constructor
  constructor(@InjectRepository(StaffEntity) private readonly FixItFridayRepository: Repository<StaffEntity>) {}

  async findAll(): Promise<StaffEntity[]> {
    return this.FixItFridayRepository.createQueryBuilder('staff')
      .leftJoin(StaffSectionAssociationEntity, 'ssa', 'staff.staffkey = ssa.staffkey')
      .leftJoinAndMapMany('staff.sections', SectionEntity, 'section', 'ssa.sectionkey = section.sectionkey')
      .getMany();
  }

  async findOneById(id: number): Promise<StaffEntity> {
    return this.FixItFridayRepository.createQueryBuilder('staff')
      .leftJoin(StaffSectionAssociationEntity, 'ssa', 'staff.staffkey = ssa.staffkey')
      .leftJoinAndMapMany('staff.sections', SectionEntity, 'section', 'ssa.sectionkey = section.sectionkey')
      .where({ staffkey: id })
      .getOne();
  }
}
