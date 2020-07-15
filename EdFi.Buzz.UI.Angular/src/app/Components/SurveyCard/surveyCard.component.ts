﻿// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-survey-card',
    templateUrl: './surveyCard.component.html',
    styleUrls: ['./surveyCard.component.css']
})
export class SurveyCardComponent {
    @Input() surveyResult: any;
    isCollapsed = true;
}
