import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SurveySummaryQuestionsEntity from '../entities/survey/surveysummaryquestions.entity';
import SurveySummaryAnsweresEntity from '../entities/survey/surveysummaryansweres.entity';

@Injectable()
export default class SurveySummaryQuestionsService {
// eslint-disable-next-line no-useless-constructor
constructor(
    @InjectRepository(SurveySummaryQuestionsEntity) private readonly FixItFridayRepository: Repository<SurveySummaryQuestionsEntity>,
    @InjectRepository(SurveySummaryAnsweresEntity) private readonly FixItFridayAnswersRepository: Repository<SurveySummaryAnsweresEntity>
  ) {}

  async findAll(): Promise<SurveySummaryQuestionsEntity[]> {
    return this.FixItFridayRepository.find();
  }

  async findAnswersByQuestion(sectionkey: number, surveyquestionkey: number): Promise<SurveySummaryAnsweresEntity[]> {
    return this.FixItFridayAnswersRepository
      .createQueryBuilder('SurveySummaryAnswers')
      .leftJoin(
        SurveySummaryQuestionsEntity,
        'ss',
        `SurveySummaryAnswers.surveyquestionkey = ss.surveyquestionkey`,
      )
      .where({ surveyquestionkey: surveyquestionkey })
      //.andWhere('SurveySummaryAnswers.sectionkey = :sectionkey', { sectionkey: sectionkey})
      .getMany();
  }
}
