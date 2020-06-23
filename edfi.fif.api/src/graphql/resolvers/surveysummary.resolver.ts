import { Args, Query, Resolver } from '@nestjs/graphql';
import { SurveySummary } from '../graphql.schema';
import SurveySummaryService from '../services/surveysummary.service';

@Resolver('SurveySummary')
export default class SurveySummaryResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly surveySummaryService: SurveySummaryService) {}

  @Query()
  async surveysummary(
      @Args('title', { nullable: true }) title: string
  ): Promise<SurveySummary[]> {
    return this.surveySummaryService.findAll(title);
  }
}
