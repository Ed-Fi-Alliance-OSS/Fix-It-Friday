import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SurveyEntity from '../entities/survey/survey.entity';
import SurveyQuestionEntity from '../entities/survey/surveyquestion.entity';

@Injectable()
export default class SurveyService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(SurveyEntity) private readonly FixItFridayRepository: Repository<SurveyEntity>,
    @InjectRepository(SurveyQuestionEntity) private readonly FixItFridayQuestionsRepository: Repository<SurveyQuestionEntity>
  ) {}

  async findAll(): Promise<SurveyEntity[]> {
    return this.FixItFridayRepository.find();
  }

  async findOneById(id: string): Promise<SurveyEntity> {
    return this.FixItFridayRepository.findOne({ where: { surveykey: id } });
  }
  
  async findQuestionBySurveyKey(surveykey: string): Promise<SurveyQuestionEntity[]> {
    return this.FixItFridayQuestionsRepository
      .createQueryBuilder('Questions')
      .innerJoin(
        SurveyEntity,
        's',
        `Questions.surveykey = s.surveykey and s.surveykey=${surveykey}`,
      )
      .where({ surveykey: surveykey })
      .getMany();
  }
}
