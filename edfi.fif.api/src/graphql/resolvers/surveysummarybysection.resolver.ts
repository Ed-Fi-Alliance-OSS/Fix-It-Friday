import { Args, Query, Resolver } from '@nestjs/graphql';
import { SurveySummaryBySection } from '../graphql.schema';
import SurveySummaryBySectionService from '../services/surveysummarybysection.service';

@Resolver('SurveySummaryBySection')
export default class SurveySummaryResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly surveySummaryBySectionService: SurveySummaryBySectionService) {}

  @Query()
  async surveysummarybysection(
      @Args('title', { nullable: false }) title: string,
      @Args('sectionkey', { nullable: true }) sectionkey: string
  ): Promise<SurveySummaryBySection[]> {
    return this.surveySummaryBySectionService.findAll(title, sectionkey);
  }
}
