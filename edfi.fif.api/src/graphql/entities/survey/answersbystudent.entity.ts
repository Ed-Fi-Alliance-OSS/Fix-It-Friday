// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ schema: 'fif', name: 'answersbystudent', synchronize: false })
export default class AnswersByStudentEntity {
  @ViewColumn()
  surveykey: string;

  @ViewColumn()
  surveyquestionkey: string;

  @ViewColumn()
  question: string;

  @ViewColumn()
  studentschoolkey: string;

  @ViewColumn()
  answer: string;
}
