const sql = require('mssql');
const { Pool } = require('pg');

const removeMapRecords = async (rowConfig, pgConfig) => {
  if (!rowConfig.isEntityMap) {
    return;
  }

  const pool = new Pool(pgConfig);
  const pgClient = await pool.connect();

  try {
    await pgClient.query('BEGIN');
    await pgClient.query(rowConfig.deleteSql);
    console.error(`[${rowConfig.recordType}] removed records`);
    await pgClient.query('COMMIT');
  } catch (error) {
    await pgClient.query('ROLLBACK');
    console.error(`[${rowConfig.recordType}] removeMapRecords:\n${error.stack}`);
  } finally {
    pgClient.release();
    await pool.end();
  }
};

const processEntity = async (values, pgClient, rowConfig) => {
  await pgClient
    .query(rowConfig.selectSql, [values[rowConfig.keyIndex]])
    .then(async (res) => {
      if (res.rowCount === 0) {
        await pgClient.query(rowConfig.insertSql, values);
      }

      if (res.rowCount === 1) {
        await pgClient.query(rowConfig.updateSql, values);
      }
    })
    .catch((err) => {
      console.error(`[${rowConfig.recordType}] ERROR processEntity:\n${err.stack}`);
    });
};

const processMappedEntity = async (values, pgClient, rowConfig) => {
  await pgClient.query(rowConfig.insertSql, values);
};

const processRowArray = async (rows, request, rowConfig, pgConfig) => {
  const pool = new Pool(pgConfig);
  const pgClient = await pool.connect();

  try {
    await pgClient.query('BEGIN');
    let row;
    /* eslint-disable no-await-in-loop */
    while ((row = rows.pop())) {
      const values = rowConfig.valueFunc(row);

      if (rowConfig.isEntityMap) {
        await processMappedEntity(values, pgClient, rowConfig);
      } else {
        await processEntity(values, pgClient, rowConfig);
      }
    }
    await pgClient.query('COMMIT');
    await request.resume();
  } catch (error) {
    await pgClient.query('ROLLBACK');
    console.error(`[${rowConfig.recordType}] processRowArray:\n${error.stack}`);
  } finally {
    pgClient.release();
    await pool.end();
  }
};

const processRecords = async (config, rowConfig, pgConfig) => {
  const rowsToProcess = [];
  await sql.connect(config);
  const request = new sql.Request();
  request.stream = true;
  request.query(rowConfig.sourceSql);

  request.on('row', (values) => {
    rowsToProcess.push(values);
    if (rowsToProcess.length >= 50) {
      request.pause();
      (async () => {
        await processRowArray(rowsToProcess, request, rowConfig, pgConfig);
      })();
    }
  });

  request.on('done', () => {
    (async () => {
      await processRowArray(rowsToProcess, request, rowConfig, pgConfig);
      sql.close();
    })();
  });

  request.on('error', (e) => {
    console.error(`[${rowConfig.recordType}] request.error:\n${e.stack}`);
  });
};

sql.on('error', (sqlerror) => {
  console.error(`sql.error:\n${sqlerror.stack}`);
});

const loadMsSqlData = async (pgConfig, mssqlConfig, config) => {
  console.error(`[${config.recordType}] loading records`);
  await removeMapRecords(config, pgConfig);
  await processRecords(mssqlConfig, config, pgConfig);
  console.log(`[${config.recordType}] records processed`);
};

exports.loadMsSqlData = loadMsSqlData;
