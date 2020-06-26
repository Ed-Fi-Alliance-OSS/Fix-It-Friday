const dotnet = require('dotenv');

dotnet.config();

const config = require('../config/dbs');
const etl = require('../config/etl');
const loadMsSqlData = require('./loadMsSqlData');

const pg = config.pgConfig;
const ms = config.mssqlConfig;

const loadBaseEntities = () => new Promise((resolve, reject) => {
  try {
    (async () => {
      console.log('loading entities');
      await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSchoolConfig);
      await loadMsSqlData.loadMsSqlData(pg, ms, etl.contactPersonConfig);
      await loadMsSqlData.loadMsSqlData(pg, ms, etl.staffConfig);
      await loadMsSqlData.loadMsSqlData(pg, ms, etl.sectionConfig);
      console.log('finished loading entities');
      resolve(true);
    })();
  } catch (error) {
    reject(error);
  }
});

const loadAssociations = (ready) => new Promise((resolve, reject) => {
  while (ready) {
    console.log('loading associations');
    try {
      (async () => {
        await loadMsSqlData.loadMsSqlData(pg, ms, etl.staffSectionConfig);
        await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSectionConfig);
        await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentContactConfig);
        resolve(true);
      })();
    } catch (error) {
      reject(error);
    }
    console.log('finished associations');
  }
});

const run = () => new Promise((resolve) => {
  (async () => {
    console.log('load starting');
    await loadBaseEntities();
    await loadAssociations();
    resolve();
  })();
});

run();
console.log('finished loading');
