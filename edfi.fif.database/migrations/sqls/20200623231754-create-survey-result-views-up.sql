CREATE OR REPLACE VIEW fif.SurveySummary
AS

SELECT
  fif.survey.surveykey, 
  fif.survey.title,
  COUNT(fif.studentsurvey.studentschoolkey) AS studentsanswered,
  (
    SELECT
      COUNT(fif.surveyquestion.surveyquestionkey)
    FROM
      fif.surveyquestion 
    WHERE 
      fif.surveyquestion.surveykey = fif.survey.surveykey
    GROUP BY 
      fif.surveyquestion.surveykey
  ) AS numberofquestions,
  (
    SELECT
      COUNT(fif.studentsection.studentschoolkey)
    FROM
      fif.studentsection
  ) AS totalstudents
FROM
  fif.survey
    INNER JOIN
      fif.studentsurvey 
        ON survey.surveykey = fif.studentsurvey.surveykey
    INNER JOIN 
      fif.studentsection 
        ON fif.studentsurvey.studentschoolkey = fif.studentsection.studentschoolkey
GROUP BY survey.surveykey, survey.title;

---

CREATE OR REPLACE VIEW fif.SurveySummaryBySection
AS

SELECT
  fif.studentsection.sectionkey,
  fif.survey.surveykey, 
  fif.survey.title,
  COUNT(fif.studentsurvey.studentschoolkey) AS studentsanswered,
  (
    SELECT
      COUNT(fif.surveyquestion.surveyquestionkey)
    FROM
      fif.surveyquestion 
    WHERE
      fif.surveyquestion.surveykey = fif.survey.surveykey
    GROUP BY 
      fif.surveyquestion.surveykey
  ) AS numberofquestions,
  (
    SELECT
      COUNT(fif.studentsection.studentschoolkey)
    FROM
      fif.studentsection
    GROUP BY
      fif.studentsection.sectionkey
  ) AS totalstudents
FROM
  fif.survey
    INNER JOIN 
      fif.studentsurvey 
        ON survey.surveykey = fif.studentsurvey.surveykey
    INNER JOIN 
      fif.studentsection 
        ON fif.studentsurvey.studentschoolkey = fif.studentsection.studentschoolkey
GROUP BY survey.surveykey, survey.title, fif.studentsection.sectionkey;

---

