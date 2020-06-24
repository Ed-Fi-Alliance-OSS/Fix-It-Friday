var fs = require('fs');
var path = require('path');

var staffSectionSourceSQL = fs.readFileSync(
	path.join(__dirname, "./../sql/0001-ImportStudentSchool.sql"),
	"utf8"
		);

var contactPersonSourceSQL = fs.readFileSync(
	path.join(__dirname, "./../sql/0002-ImportContactPerson.sql"),
	"utf8"
		);

var studentContactSourceSQL = fs.readFileSync(
	path.join(__dirname, "./../sql/0003-ImportStudentContact.sql"),
	"utf8"
		);

exports.studentSchoolConfig = {
	recordType: "StudentSchool",
	selectSql: "SELECT 1 FROM fif.studentschool WHERE studentschoolkey=$1",
	insertSql: "INSERT INTO fif.studentschool (studentschoolkey, studentkey, schoolkey, schoolyear, studentfirstname, studentmiddlename, studentlastname, enrollmentdatekey, gradelevel, limitedenglishproficiency, ishispanic, sex) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::text, $11::bit, $12::text)",
	updateSql: "UPDATE fif.studentschool SET studentkey = $2, schoolkey = $3, schoolyear = $4, studentfirstname = $5, studentmiddlename = $6, studentlastname = $7, enrollmentdatekey = $8, gradelevel = $9, limitedenglishproficiency = $10, ishispanic = $11, sex = $12 WHERE studentschoolkey=$1",
	sourceSql: staffSectionSourceSQL
};

exports.contactPersonConfig = {
	recordType: "ContactPerson",
	selectSql: "SELECT 1 FROM fif.contactperson WHERE uniquekey=$1",
	insertSql: "INSERT INTO fif.contactperson (uniquekey, contactpersonkey, studentkey, contactfirstname, contactlastname, relationshiptostudent, streetnumbername, apartmentroomsuitenumber, state, postalcode, phonenumber, primaryemailaddress, isprimarycontact, preferredcontactmethod, besttimetocontact, contactnotes) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::text, $11::text, $12::text, $13, $14::text, $15::text, $16::text)",
	updateSql: "UPDATE fif.contactperson SET contactpersonkey=$2, studentkey=$3, contactfirstname=$4, contactlastname=$5, relationshiptostudent=$6, streetnumbername=$7, apartmentroomsuitenumber=$8, state=$9, postalcode=$10, phonenumber=$11, primaryemailaddress=$12, isprimarycontact=$13, preferredcontactmethod=$14, besttimetocontact=$15, contactnotes=$16 WHERE uniquekey= $1",
	sourceSql: contactPersonSourceSQL
};


exports.studentContactConfig = {
	recordType: "StudentContact",
	deleteSql: "DELETE FROM fif.studentcontact",
	insertSql: "INSERT INTO fif.studentcontact (contactkey, studentschoolkey) VALUES ($1::text, $2::text)",
	sourceSql: studentContactSourceSQL
};

