// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

package angular

import jetbrains.buildServer.configs.kotlin.v2019_2.*

object AngularProject : Project({
    id("Buzz_UI_Angular")
    name = "Angular"
    description = "Buzz User Interface - Angular"

    buildType(angular.buildTypes.PullRequestAngularBuild)
    buildType(angular.buildTypes.BranchAngularBuild)

    params{
        param("project.directory", "./EdFi.Buzz.UI.Angular");
        param("vcs.checkout.rules","""
        +:.teamcity => .teamcity
        +:%project.directory% => %project.directory%
        """.trimIndent())
    }
})
