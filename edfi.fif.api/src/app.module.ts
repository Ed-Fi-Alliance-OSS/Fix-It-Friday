import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import AppService from './app.service';
import SectionModule from './graphql/modules/section.module';
import StaffModule from './graphql/modules/staff.module';
import StudentSchoolModule from './graphql/modules/studentschool.module';
import SurveyModule from './graphql/modules/survey.module';
import SurveySummaryModule from './graphql/modules/surveysummary.module';
import SurveySummaryBysectionModule from './graphql/modules/surveysummarybysection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    SectionModule,
    StaffModule,
    StudentSchoolModule,
    SurveyModule,
    SurveySummaryModule,
    SurveySummaryBysectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
