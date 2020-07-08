import { Args, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SurveySummary, SurveySummaryQuestions } from '../graphql.schema';
import SurveySummaryService from '../services/surveysummary.service';
import ValidateStaffIdGuard from '../guards/validateStaffId.guard';

@Resolver('SurveySummary')
export default class SurveySummaryResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly surveySummaryService: SurveySummaryService) {}

  @Query()
  @UseGuards(ValidateStaffIdGuard)
  async surveysummary(
    @Args('title', { nullable: false }) title: string,
    @Args('staffkey', { nullable: false }) staffkey: number,
    @Args('sectionkey', { nullable: false }) sectionkey: string,
  ): Promise<SurveySummary[]> {
    return this.surveySummaryService.findAll(title, staffkey, sectionkey);
  }

  @ResolveProperty('questions')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async questions(@Parent() parent): Promise<SurveySummaryQuestions[]> {
    return this.surveySummaryService.findQuestionsBySurvey(parent.surveykey);
  }
}
