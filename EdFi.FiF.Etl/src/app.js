var studentSchool = require('./studentschool');
var config = require('./../config/dbs');
var etl = require('./../config/etl');

studentSchool.process(config.pgConfig, config.mssqlConfig, etl.studentSchoolConfig);
