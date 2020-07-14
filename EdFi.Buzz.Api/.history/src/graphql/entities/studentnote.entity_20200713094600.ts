// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Entity, Column, PrimaryColumn } from 'typeorm';
import { config } from 'dotenv';

@Entity({ schema: process.env.BUZZ_API_DB_SCHEMA, name: 'studentnote', synchronize: false })
export default class StudentNoteEntity {
  @PrimaryColumn() studentnotekey: string;

  @Column() note: string;

  @Column() studentschoolkey: string;

  @Column() staffkey: number;

  @Column() dateadded: string;
}
