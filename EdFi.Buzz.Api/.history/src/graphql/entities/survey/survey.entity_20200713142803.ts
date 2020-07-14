// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Entity, Column, PrimaryColumn } from 'typeorm';
import { config } from 'dotenv';
import SurveyQuestionEntity from './surveyquestion.entity';

config({ path: `${__dirname}/../../../../.env` });
@ViewEntity({ schema: `${process.env.BUZZ_API_DB_SCHEMA}`, name: 'survey', synchronize: false })
export default class SurveyEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false })
  surveykey: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  questions?: SurveyQuestionEntity[];
}
