# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

#requires -version 5

[CmdletBinding()]
param(
  [string]
  $DbServer = "localhost",

  [int]
  $DbPort = 5432,

  [string]
  $DbUserName = "postgres",

  [string]
  [Parameter(Mandatory=$true)]
  $DbPassword,

  [string]
  $DbName = "fixitfriday"
)
$InstallPath = "$PSScriptRoot/../dist"
if (-not(Test-Path $InstallPath)) {
    # Need one more parent directory if running straight from source code
    # instead of from NuGet package.
    $InstallPath = "$PSScriptRoot/../../dist"
    if (-not(Test-Path $InstallPath)) {
        throw "Cannot find dist directory"
    }
}

function New-DotEnvFile {
  $fileContents = @"
FIF_DB_HOST = '$DbServer'
FIF_DB_PORT = $DbPort
FIF_DB_USERNAME ='$DbUserName'
FIF_DB_PASSWORD = '$DbPassword'
FIF_DB_DATABASE = '$DbName'
"@

  $fileContents | Out-File "$InstallPath/.env" -Encoding UTF8 -Force
}

function Install-Database {
    Push-Location -Path $InstallPath
    Write-Host "Executing: npm install --production" -ForegroundColor Magenta
    &npm install --production

    Write-Host "Executing: npm run migrate" -ForegroundColor Magenta
    &npm run migrate
    Pop-Location
}

Write-Host "Begin Fix-it-Friday database installation..." -ForegroundColor Yellow

New-Item -Path $InstallPath -ItemType Directory -Force | Out-Null

New-DotEnvFile
Install-Database

Write-Host "End Fix-it-Friday API installation." -ForegroundColor Yellow
