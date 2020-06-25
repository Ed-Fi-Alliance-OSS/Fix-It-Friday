const csv = require('csv-parser');
const fs = require('fs');
const { isMainThread } = require('worker_threads');

const SURVEY_DATE_FIELD = "Timestamp";
const STUDENT_SCHOOL_KEY_FIELD = "StudentUSI";
const METADATA_FIELDS = [SURVEY_DATE_FIELD, STUDENT_SCHOOL_KEY_FIELD, "FirstName", "LastSurname", "ElectronicMailAddress"];

async function getDB() {
    var pgConfig = {
        userName: "postgres",
        password: "dockerpwd",
        host: "172.17.0.1",
        port: 5432,
        database: "FixItFriday",
    }
    var connectionString = `postgres://${pgConfig.userName}:${pgConfig.password}@${pgConfig.host}:${pgConfig.port}/${pgConfig.database}`;


    const { Client } = require('pg');
    const client = new Client({ connectionString: connectionString });
    await client.connect()
        .catch(e => console.error(e));
    return client;
}

async function Extract(fileName) {
    let questions = null;
    let answers = [];
    return new Promise(resolve => {
        fs.createReadStream(fileName)
            .pipe(csv())
            .on('headers', headers => questions = headers)
            .on('data', row => answers.push(row))
            .on('end', () => {
                resolve({ questions: questions, answers: answers });
            });
    });

}

async function Transform(csvArray) {
}

async function Load(surveytitle, questions, answers, db) {

    async function getOrSaveSurvey(surveytitle, db) {
        return await db
            .query("SELECT surveykey, title FROM fif.survey where title = $1;", [surveytitle])
            .then(async result => {
                if (result.rows.length == 0) {
                    return await db
                        .query("INSERT INTO fif.survey (title) VALUES($1) RETURNING surveykey, title;", [surveytitle])
                        .then(result => result.rows[0])
                }
                return result.rows[0];
            })
            .catch(e => console.error(e))
    }

    async function getQuestions(surveykey, db) {
        return await db.query("SELECT * FROM fif.surveyquestion sq where sq.surveykey = $1", [surveykey])
            .then(result => result.rows);
    }

    async function getOrSaveQuestions(questions, surveykey, db) {
        let dbQuestions = await getQuestions(surveykey, db);
        let toSave = questions
            .filter(h =>
                !dbQuestions.some(q => q.question.toUpperCase() == h.toUpperCase()) &&
                !METADATA_FIELDS.some(f => f.toUpperCase() == h.toUpperCase())
            );
        for (q in toSave) {
            await db.query("INSERT INTO fif.surveyquestion (surveykey, question) VALUES($1, $2);", [surveykey, toSave[q]]);
        }

        return await db.query("SELECT * FROM fif.surveyquestion sq where sq.surveykey = $1", [survey.surveykey])
            .then(result => result.rows);
    }

    async function getOrSaveStudentSurvey(surveykey, studentAnswers, db) {
        let date = studentAnswers[SURVEY_DATE_FIELD];
        let studentschoolkey = studentAnswers[STUDENT_SCHOOL_KEY_FIELD];

        return await db
            .query("SELECT studentsurveykey, surveykey, studentschoolkey, \"date\" FROM fif.studentsurvey where surveykey = $1 and studentschoolkey = $2; ", [surveykey, studentschoolkey])
            .then(async result => {
                if (result.rows.length > 0) { return result.rows[0] }
                return await db
                    .query("INSERT INTO fif.studentsurvey (surveykey, studentschoolkey, \"date\") VALUES($1, $2, $3) RETURNING *;", [surveykey, studentschoolkey, date])
                    .then(result => result.rows[0]);
            });
    }

    async function saveAnswers(surveykey, questions, studentSurveyAnswers, db) {
        let questionKeyMap = {};
        questions.forEach(element => {
            questionKeyMap[element.question] = element.surveyquestionkey;
        });
        for (currentStudentAnswers in studentSurveyAnswers) {
            let studentsurvey = await getOrSaveStudentSurvey(surveykey, answers[currentStudentAnswers], db);
            for (q in studentSurveyAnswers[currentStudentAnswers]) {
                if (!questionKeyMap[q]) { continue; }
                db
                    .query(`
INSERT INTO fif.studentsurveyanswer (studentsurveykey, surveyquestionkey, answer)
SELECT $1, $2, $3
WHERE NOT EXISTS (SELECT FROM fif.studentsurveyanswer WHERE studentsurveykey = $1 AND surveyquestionkey = $2)
`, [studentsurvey.studentsurveykey, questionKeyMap[q], studentSurveyAnswers[currentStudentAnswers][q]]);
                ;
            }
        }
        await db.query("select 1");
    }

    let survey = await getOrSaveSurvey(surveytitle, db);
    survey.questions = await getOrSaveQuestions(questions, survey.surveykey, db);
    await saveAnswers(survey.surveykey, survey.questions, answers, db);
    await db.end();
    console.log({ surveykey: survey.surveykey, title:survey.title, questionCount: survey.questions.length, answers: answers.length } );
}

async function ETLRunner(surveytitle, filename) {
    let data = await Extract(filename);
    let db = await getDB();
    await Load(surveytitle, data.questions, data.answers, db);
}

// async function main() {
//     console.time("Start");
//     console.time("Survey 1");
//     await ETLRunner("Contact", 1, "./sampleData/surveys/ContactSurvey.csv");
//     console.timeEnd("Survey 1");

//     console.time("Survey 2");
//     await ETLRunner("Internet Access", 2, "./sampleData/surveys/InternetAccessSurvey.csv");
//     console.timeEnd("Survey 2");

//     console.timeEnd("Start");
// }

// main();

function getArgs(argv) {
    var args = {
        debug: true,
        help: false,
        filename: "./sampleData/surveys/InternetAccessSurvey.csv",
        surveyTitle: "Internet Access"
    }

    if (argv[2] == "--help" || argv[2] == "-h") {
        args.help = true;
        return args;
    }

    if (argv.length > 4 || argv.length < 4) {
        args.help = !args.debug && argv.length < 4 ;
        return args;
    }

    args.filename = argv[2];
    args.surveyTitle = argv[3];

    return args;
}


async function main() {
    let args = getArgs(process.argv);

    if (args.help) { 
        var path = require("path");
        console.log(`Usage: node ${path.basename(process.argv[1])} [-h | --help] | filename surveyTitle`) 
        return;
    }

    console.time("Load survey time");
    await ETLRunner(args.surveyTitle, args.filename);
    console.timeEnd("Load survey time");
}

main();