var studentSchool = require('./studentschool');
var contactPerson = require('./contactPerson');
var studentContact = require('./studentContact');
var config = require('./../config/dbs');
var etl = require('./../config/etl');

studentSchool.process(config.pgConfig, config.mssqlConfig, etl.studentSchoolConfig);
contactPerson.process(config.pgConfig, config.mssqlConfig, etl.contactPersonConfig);
studentContact.process(config.pgConfig, config.mssqlConfig, etl.studentContactConfig);
