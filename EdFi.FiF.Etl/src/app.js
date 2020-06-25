const dotnet = require('dotenv');

dotnet.config();

const studentSchool = require('./studentschool');
const contactPerson = require('./contactperson');
const studentContact = require('./studentcontact');
const staff = require('./staff');
const section = require('./section.js');
const staffSection = require('./staffsectionassociation');
const studentSection = require('./studentsection');
const config = require('../config/dbs');
const etl = require('../config/etl');

const pg = config.pgConfig;
const ms = config.mssqlConfig;

const loadBaseEntities = () => new Promise((resolve, reject) => {
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

const loadAssociations = () => new Promise((resolve, reject) => {
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

const run = () => new Promise((resolve) => {
  (async () => {
    console.log('load starting');
    await loadBaseEntities();
    await loadAssociations();
    console.log('finished loading');
    resolve();
  })();
});

run().then(process.exit);
