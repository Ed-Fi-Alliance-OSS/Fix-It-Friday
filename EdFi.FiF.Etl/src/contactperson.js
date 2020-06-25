const { Connection, Request } = require('tedious');
const { Pool } = require('pg');

const loadRecords = (pgConfig, mssqlConfig, config) => {
  const timeLabel = `${config.recordType}-process`;

  console.log(`Processing ${config.recordType} records`);

  const pool = new Pool(pgConfig);
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
        args[0][2].value || '',
        args[0][3].value || '',
        args[0][4].value || '',
        args[0][5].value || '',
        args[0][6].value || '',
        args[0][7].value || null,
        args[0][8].value || '',
        args[0][9].value || '',
        args[0][10].value || null,
        args[0][11].value || null,
        args[0][12].value ? 1 : 0 || null,
        args[0][13].value || null,
        args[0][14].value || null,
        args[0][15].value || null,
      ];
      pool
        .query(config.selectSql, [args[0][0].value])
        .then((res) => {
          if (res.rowCount === 0) {
            pool
              .query(config.insertSql, values)
              .catch((err) => { console.error(`An error occurred trying to insert ${config.recordType} object:\n${JSON.stringify(args)}\n${err.stack}`); });
          }
          if (res.rowCount === 1) {
            pool
              .query(config.updateSql, values)
              .catch((err) => { console.error(`An error occurred trying to update ${config.recordType} object:\n${JSON.stringify(args)}\n${err.stack}`); });
          }
        })
        .catch((err) => {
          console.error(err.stack);
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
