import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'fif', name: 'surveyquestion', synchronize: false })
export default class SurveyQuestionEntity {
  
  @PrimaryColumn({ type: 'varchar', nullable: false}) 
  surveyquestionkey: string;

  @Column({ type: 'varchar', nullable: false})
  surveykey: string;

  @Column({ type: 'varchar', nullable: false})
  question: string;
}