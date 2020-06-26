const sql = require('mssql');
const { Pool } = require('pg');

const removeMapRecords = function (rowConfig, pgConfig) {
    if (!rowConfig.isEntityMap) {
        return;
    }

    const pool = new Pool(pgConfig);
    (async () => {
        let pgClient = await pool.connect();
        try {
            await pgClient.query('BEGIN');
            await pgClient.query(rowConfig.deleteSql).then(() => {
                console.log(`[${rowConfig.recordType}] records deleted`);
            });
            await pgClient.query('COMMIT');
        } catch (error) {
            await pgClient.query('ROLLBACK');
            console.error(`[${rowConfig.recordType}] removeMapRecords:\n${error.stack}`);
        } finally {
            pgClient.release();
            pool.end();
        }
    })();
};

const processEntity = async function (values, pgClient, rowConfig) {
    await pgClient
        .query(rowConfig.selectSql, [values[rowConfig.keyIndex]])
        .then((res) => {
            if (res.rowCount === 0) {
                pgClient.query(rowConfig.insertSql, values).catch(() => {
                  console.error(`[${rowConfig.recordType}] ERROR insert error:\n${error.stack}`);
                });
            }

            if (res.rowCount === 1) {
                pgClient.query(rowConfig.updateSql, values).catch(() => {
                  console.error(`[${rowConfig.recordType}] ERROR update error:\n${error.stack}`);
                });
            }
        })
        .catch((err) => {
            console.error(`[${rowConfig.recordType}] ERROR processEntity:\n${error.stack}`);
        });
};

const processMappedEntity = async function (values, pgClient, rowConfig) {
    await pgClient.query(rowConfig.insertSql, values).catch((err) => {
      console.error(`[${rowConfig.recordType}] ERROR processMappedEntity:\n${err.stack}`);
    });
};

const processRowArray = async function (rows, request, rowConfig, pgConfig) {
    const pool = new Pool(pgConfig);
    (async () => {
        let pgClient = await pool.connect();

        try {
            await pgClient.query('BEGIN');
            let row;
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
            pool.end();
        }
    })();
};

const processRecords = async function (config, rowConfig, pgConfig) {
    const rowsToProcess = [];

    await removeMapRecords(rowConfig, pgConfig);

    (async function () {
        await sql.connect(config);
        const request = new sql.Request();
        request.stream = true;
        request.query(rowConfig.sourceSql);

        request.on('row', (values) => {
            rowsToProcess.push(values);
            if (rowsToProcess.length >= 50) {
                request.pause();
                (async function () {
                    await processRowArray(rowsToProcess, request, rowConfig, pgConfig);
                })();
            }
        });

        request.on('done', () => {
            (async function () {
                await processRowArray(rowsToProcess, request, rowConfig, pgConfig);
            })();
        });

        request.on('error', (e) => {
            console.error(`[${rowConfig.recordType}] request.error:\n${e.stack}`);
        });

        request.on('done', () => {
            console.log(`[${rowConfig.recordType}] request.done`);
            sql.close();
        });
    })();
};

sql.on('error', (sqlerror) => {
    console.error(`[${rowConfig.recordType}] sql.error:\n${sqlerror.stack}`);
});

const loadMsSqlData = (pgConfig, mssqlConfig, config) => {
  try {
      (async function () {
          processRecords(mssqlConfig, config, pgConfig);
      })();
     console.log(`${config.recordType} done`);
  } catch (error) {
      throw error;
  }
};

exports.loadMsSqlData = loadMsSqlData;
