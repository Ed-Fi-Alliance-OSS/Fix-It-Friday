const { Connection, Request } = require('tedious');
const { Pool } = require('pg');

const loadRecords = (pgConfig, mssqlConfig, config) => {
  const timeLabel = `${config.recordType}-process`;

  console.log(`Processing ${config.recordType} records`);

  const pool = new Pool(pgConfig);
  pool.query(config.deleteSql).then(() => { console.log(`All ${config.recordType} records deleted`); });

  const connection = new Connection(mssqlConfig);

  connection.connect((e) => {
    if (e) {
      throw e;
    }

    const request = new Request(config.sourceSql, () => {
      console.timeEnd(timeLabel);
      console.log(`closing ${config.recordType} connection`);
      connection.close();
    });

    request.on('done', () => {
      pool.close();
      console.log(`${config.recordType} process done`);
    });

    request.on('row', (...args) => {
      const values = [
        args[0][0].value || '',
        args[0][1].value || '',
      ];

      pool
        .query(config.insertSql, values)
        .catch((err) => {
          console.error(`An error occurred trying to insert ${config.recordType}:\n${JSON.stringify(args)}\n${err.stack}`);
        });
    });
    console.time(timeLabel);
    connection.execSql(request);
  });
};

const process = (pgConfig, mssqlConfig, config) => new Promise((resolve, reject) => {
  try {
    loadRecords(pgConfig, mssqlConfig, config);
    return resolve(`${config.recordType} done`);
  } catch (error) {
    return reject(error);
  }
});

exports.process = process;
