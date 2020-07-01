# Fix It Fridays TOD - Teacher Observation Dashboards

These scripts were made possible thanks to the Ed-Fi Alliance and the Michael and Susan Dell Foundation.

## Description

This script will do ETL on Google Form Survey data to the FIF database.

## Prerequisites

We recommend that the following prerequisites are installed on the machine that you are going to run the scripts on.

1. Node Js LTS version https://nodejs.org/en/
2. Postgresql

That is it =)


## Setup Instructions

1. Download the repository
2. Setup database using edfi.fif.database if needed (Edit its database.json config file and run `yarn migrate`)
3. Install dependencies with `npm install`
4. Edit config.json with the correct Postgres server data
5. For using the sample data:
    1. use sampleData/InsertSampleStudentData.sql to insert fif.studentschool
    2. sampleData/surveys/* are example csv's to import that have studentkeys references to sampleData/InsertSampleStudentData.sql


## How to run

```powershell
npm surveyETL sampleData/surveys/InternetAccessSurvey.csv "Internet Access"

```


## Legal Information

Copyright (c) 2020 Ed-Fi Alliance, LLC and contributors.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License").

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See [NOTICES](NOTICES.md) for additional copyright and license notifications.
