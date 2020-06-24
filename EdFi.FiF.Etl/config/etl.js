var fs = require('fs');
var path = require('path');

var staffSectionSourceSQL = fs.readFileSync(
	path.join(__dirname, "./../sql/0001-ImportStudentSchool.sql"),
	"utf8"
        );

exports.studentSchoolConfig = {
    recordType: "StudentSchool",
    selectSql: "SELECT 1 FROM fif.studentschool WHERE studentschoolkey=$1",
    insertSql: "INSERT INTO fif.studentschool (studentschoolkey, studentkey, schoolkey, schoolyear, studentfirstname, studentmiddlename, studentlastname, enrollmentdatekey, gradelevel, limitedenglishproficiency, ishispanic, sex) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::text, $11::bit, $12::text)",
    updateSql: "UPDATE fif.studentschool SET studentkey = $2, schoolkey = $3, schoolyear = $4, studentfirstname = $5, studentmiddlename = $6, studentlastname = $7, enrollmentdatekey = $8, gradelevel = $9, limitedenglishproficiency = $10, ishispanic = $11, sex = $12 WHERE studentschoolkey=$1",
    sourceSql: staffSectionSourceSQL
};
