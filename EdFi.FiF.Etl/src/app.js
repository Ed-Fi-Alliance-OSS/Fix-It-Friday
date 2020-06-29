const dotnet = require('dotenv');

dotnet.config();

const config = require('../config/dbs');
const etl = require('../config/etl');
const loadMsSqlData = require('./loadMsSqlData');

const pg = config.pgConfig;
const ms = config.mssqlConfig;

const loadingOdsData = async () => {
  try {
    console.log('loading records from ODS');
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.staffConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.sectionConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSchoolConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.contactPersonConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentSectionConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.studentContactConfig);
    await loadMsSqlData.loadMsSqlData(pg, ms, etl.staffSectionConfig);
    console.log('finished loading records');
  } catch (error) {
    throw error;
  }
};

loadingOdsData();
