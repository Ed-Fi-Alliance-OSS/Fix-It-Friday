import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SurveySummary from '../entities/survey/SurveySummary.entity';

@Injectable()
export default class SurveySummaryService {
// eslint-disable-next-line no-useless-constructor
constructor(@InjectRepository(SurveySummary) private readonly FixItFridayRepository: Repository<SurveySummary>) {}

  async findAll(title: string): Promise<SurveySummary[]> {
    if (title)
    {
      return this.FixItFridayRepository
        .createQueryBuilder()
        .select("SurveySummary")
        .where(`LOWER(SurveySummary.title) like LOWER('%${title}%')`)
        .getMany();
    }
      else
        return this.FixItFridayRepository.find();
  }
}
