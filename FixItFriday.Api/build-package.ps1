# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

#requires -version 5

param(
    [string]
    [validateset("debug", "release")]
    $Configuration = "debug",

    [string]
    [Parameter(Mandatory=$true)]
    $Version,

    [string]
    $VersionSuffix = ""
)

$ErrorActionPreference = "Stop"

if ($VersionSuffix) {
    $Version += "-$VersionSuffix"
}

$parameters = @(
    "publish",
    "--configuration", 
    $Configuration
)
Write-Host "dotnet $parameters"  -ForegroundColor Magenta
&dotnet @parameters

$parameters = @(
    "pack", "FixItFriday.Api.csproj",
    "-p:PackageVersion=$Version"
    "-p:NuspecFile=$(Resolve-Path "$PSScriptRoot/FixItFriday.Api.nuspec")",
    "-p:NuspecProperties=\""Configuration=$Configuration;Version=$Version\""",
    "--no-build",
    "--no-restore",
    "--output", "$PSScriptRoot/dist",
    # Suppress warnings about script files not being recognized and executed
    "-nowarn:NU5111,NU5110,NU5100"
)

Write-Host "dotnet $parameters"  -ForegroundColor Magenta
&dotnet @parameters