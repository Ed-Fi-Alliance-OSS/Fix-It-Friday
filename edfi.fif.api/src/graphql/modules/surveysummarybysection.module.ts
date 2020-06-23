import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SurveySummaryBySectionResolvers from '../resolvers/surveysummarybysection.resolver';
import SurveySummaryBySectionService from '../services/surveysummarybysection.service';
import SurveySummaryBySection from '../entities/survey/SurveySummaryBySection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveySummaryBySection])],
  providers: [SurveySummaryBySectionService, SurveySummaryBySectionResolvers],
})
export default class SurveySummaryBySectionModule {}
