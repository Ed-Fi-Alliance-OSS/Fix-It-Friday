var dotnet = require('dotenv');
dotnet.config();

var studentSchool = require('./studentschool');
var contactPerson = require('./contactPerson');
var studentContact = require('./studentContact');
var staff = require('./staff');
var section = require('./section.js');
var staffSection = require('./staffsectionassociation');
var studentSection = require('./studentsection');
var config = require('./../config/dbs');
var etl = require('./../config/etl');

const pg = config.pgConfig;
const ms = config.mssqlConfig;

const loadBaseEntities = function () {
	return new Promise((resolve, reject) => {
		try {
			(async () => {
                console.log('loading entities');
                await contactPerson.process(pg, ms, etl.contactPersonConfig);
                await studentSchool.process(pg, ms, etl.studentSchoolConfig);
				await staff.process(pg, ms, etl.staffConfig);
				await section.process(pg, ms, etl.sectionConfig);
                console.log('finished loading entities');
                resolve();
			})();
		} catch (error) {
			reject(error);
		}
	});
}

const loadAssociations = function () {
	return new Promise((resolve, reject) => {
		try {
			(async () => {
                console.log('loading associations');
                await staffSection.process(pg, ms, etl.staffSectionConfig);
				await studentSection.process(pg, ms, etl.studentSectionConfig);
                await studentContact.process(pg, ms, etl.studentContactConfig);
                console.log('finished loading associations');
				resolve();
			})();
		} catch (error) {
			reject(error);
		}
	});
}

const run = function(){
	return new Promise(resolve => {
		(async () => {
            console.log('load starting');
			await loadBaseEntities();
            await loadAssociations();
            console.log('finished loading');
            resolve();
		})();
	});
};

run().then(process.exit);
