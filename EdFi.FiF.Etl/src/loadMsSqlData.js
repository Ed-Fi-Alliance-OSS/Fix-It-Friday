const readline = require('readline');
const sql = require('mssql');
const { Pool } = require('pg');

const ROW_COUNT_TO_LOAD = 50;

const removeMapRecords = async function (rowConfig, pgConfig) {
  if (!rowConfig.isEntityMap) {
    return;
  }

  const pool = new Pool(pgConfig);
  let pgClient = {};
  try {
    pgClient = await pool.connect();
    await pgClient.query('BEGIN');
    await pgClient.query(rowConfig.deleteSql)
      .then(res => {
        console.log(`[${rowConfig.recordType}] ${res.rowCount} records deleted`);
      });
    await pgClient.query('COMMIT');
  } catch (error) {
    await pgClient.query('ROLLBACK');
    console.error(`[${rowConfig.recordType}] removeMapRecords:\n${error.stack}`);
  } finally {
    if (pgClient.release) {
      pgClient.release();
    }
    await pool.end();
  }
};

const processEntity = async (values, pgClient, rowConfig) => {
  await pgClient
    .query(rowConfig.selectSql, [values[rowConfig.keyIndex]])
    .then(async (res) => {
      if (res.rowCount === 0) {
        await pgClient.query(rowConfig.insertSql, values).catch(() => {
          console.error(`[${rowConfig.recordType}] ERROR insert error:\n${error.stack}`);
        });
      }

      if (res.rowCount === 1) {
        await pgClient.query(rowConfig.updateSql, values).catch(() => {
          console.error(`[${rowConfig.recordType}] ERROR update error:\n${error.stack}`);
        });
      }
    })
    .catch((err) => {
      console.error(`[${rowConfig.recordType}] ERROR processEntity:\n${err.stack}`);
    });
};

const processMappedEntity = async (values, pgClient, rowConfig) => {
  await pgClient.query(rowConfig.insertSql, values)
    .catch((err) => {
      console.error(`[${rowConfig.recordType}] ERROR processMappedEntity:\n${err.stack}`);
    });
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
  await removeMapRecords(rowConfig, pgConfig);
  await sql.connect(config);
  const request = new sql.Request();
  request.stream = true;

  let processedRows = 0;
  let done = false;

  request.on('row', async (values) => {
    rowsToProcess.push(values);
    if (rowsToProcess.length >= ROW_COUNT_TO_LOAD) {
      processedRows += rowsToProcess.length

      request.pause();
      await processRowArray(rowsToProcess, request, rowConfig, pgConfig);

      rewriteLine(`[${rowConfig.recordType}] Loaded records: ${processedRows}`, process.stdout);
    }
  });

  request.on('done', async () => {
    processedRows += rowsToProcess.length;

    await processRowArray(rowsToProcess, request, rowConfig, pgConfig);
    done = true;

    rewriteLine(`[${rowConfig.recordType}] Loaded records: ${processedRows}`, process.stdout);
    console.log(`\n[${rowConfig.recordType}] request.done`);
    await sql.close();
  });

  request.on('error', async (e) => {
    console.error(`[${rowConfig.recordType}] request.error:\n${e.stack}`);
  });
  await request.query(rowConfig.sourceSql);
  /* returns before 'done' is run. To prevent that we wait */
  await (async () => { while (!done)( await new Promise(resolve => setTimeout(resolve, 100)) ); })();
};

function rewriteLine(text, stream) {
  readline.clearLine(stream);     // clear current text
  readline.cursorTo(stream, 0);   // move cursor to beginning of line
  stream.write(text);
}

sql.on('error', (sqlerror) => {
  console.error(`[${rowConfig.recordType}] sql.error:\n${sqlerror.stack}`);
});

const loadMsSqlData = async (pgConfig, mssqlConfig, config) => {
  try {
    await processRecords(mssqlConfig, config, pgConfig);
    console.log(`${config.recordType} done`);
  } catch (error) {
    throw error;
  }
};

exports.loadMsSqlData = loadMsSqlData;
