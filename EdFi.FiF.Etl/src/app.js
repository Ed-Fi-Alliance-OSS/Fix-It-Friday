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
            console.log('a');
            (async () => {
                studentSchool.process(pg, ms, etl.studentSchoolConfig)
                .then(() => staff.process(pg, ms, etl.staffConfig))
                .then(() => section.process(pg, ms, etl.sectionConfig))
                .then(() => contactPerson.process(pg, ms, etl.contactPersonConfig))
                .then(() => resolve());
            })();
            console.log('b');
        } catch (error) {
            reject(error);
        }
    });
}

const loadAssociations = function () {
    return new Promise((resolve, reject) => {
        try {
            console.log('a');
            (async () => {
                staffSection.process(pg, ms, etl.staffSectionConfig)
                //.then(() => studentSection.process(pg, ms, etl.studentSectionConfig))
                //.then(() => studentContact.process(pg, ms, etl.studentContactConfig))
                .then(() => resolve());
            })();
            console.log('b');
        } catch (error) {
            reject(error);
        }
    });
}

const run = function(){
    return new Promise(resolve => {
        (async () => {
            await Promise.resolve()
                .then(loadBaseEntities)
                .then(() => { console.log('c');})
                //.then(loadAssociations)
                .then(() => { console.log('d');});
        })();
    });
};

run().then(() => { console.log('e');});
