import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SurveySummaryResolvers from '../resolvers/surveysummary.resolver';
import SurveySummaryService from '../services/surveysummary.service';
import SurveySummary from '../entities/survey/SurveySummary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveySummary])],
  providers: [SurveySummaryService, SurveySummaryResolvers],
})
export default class SurveySummaryModule {}
