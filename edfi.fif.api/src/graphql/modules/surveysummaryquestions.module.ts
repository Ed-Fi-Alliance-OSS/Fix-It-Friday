import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SurveySummaryQuestionsResolvers from '../resolvers/surveysummaryquestions.resolver';
import SurveySummaryQuestionsService from '../services/surveysummaryquestions.service';
import SurveySummaryQuestionsEntity from '../entities/survey/surveysummaryquestions.entity';
import SurveySummaryAnsweresEntity from '../entities/survey/surveysummaryansweres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveySummaryQuestionsEntity, SurveySummaryAnsweresEntity])],
  providers: [SurveySummaryQuestionsService, SurveySummaryQuestionsResolvers],
})
export default class SurveySummaryQuestionsModule {}
