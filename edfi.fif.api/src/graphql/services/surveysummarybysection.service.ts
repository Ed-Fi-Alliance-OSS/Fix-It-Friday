import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SurveySummaryBySection from '../entities/survey/SurveySummaryBySection.entity';

@Injectable()
export default class SurveySummaryBySectionService {
// eslint-disable-next-line no-useless-constructor
constructor(@InjectRepository(SurveySummaryBySection) private readonly FixItFridayRepository: Repository<SurveySummaryBySection>) {}

  async findAll(title: string, sectionkey: string): Promise<SurveySummaryBySection[]> {
    if (title)
    {
       return this.FixItFridayRepository
      .createQueryBuilder()
      .select("SurveySummaryBySection")
      .where(`LOWER(SurveySummaryBySection.title) like LOWER('%${title}%')`)
      .getMany();
    }
    else
      return this.FixItFridayRepository.find();
  }
}
