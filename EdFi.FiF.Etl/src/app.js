const dotnet = require('dotenv');

dotnet.config();

const config = require('../config/dbs');
const etl = require('../config/etl');
const loadMsSqlData = require('./loadMsSqlData');

const pg = config.pgConfig;
const ms = config.mssqlConfig;

const loadBaseEntities = () => {
  try {
    (async () => {
      console.log('loading entities');
      loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSchoolConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.contactPersonConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.staffConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.sectionConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.staffSectionConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSectionConfig);
      loadMsSqlData.loadMsSqlData(pg, ms, etl.studentContactConfig);
      console.log('finished loading entities');
    })();
  } catch (error) {
    reject(error);
  }
};

loadBaseEntities();
console.log('loadEntities done');
