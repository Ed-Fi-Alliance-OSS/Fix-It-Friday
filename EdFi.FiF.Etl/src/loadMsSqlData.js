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
                console.log(`All ${rowConfig.recordType} records deleted`);
            });
            await pgClient.query('COMMIT');
        } catch (error) {
            await pgClient.query('ROLLBACK');
            console.log(`ERROR: removeMapRecords\n${error.stack}`);
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
                    `error on insert`;
                });
            }

            if (res.rowCount === 1) {
                pgClient.query(rowConfig.updateSql, values).catch(() => {
                    `error on update`;
                });
            }
        })
        .catch((err) => {
            console.error(`ERROR: processEntity\n${err.stack}`);
        });
};

const processMappedEntity = async function (values, pgClient, rowConfig) {
    await pgClient.query(rowConfig.insertSql, values).catch((err) => {
        console.error(err.stack);
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
            console.error(`ERROR: processRowArray${error.stack}`);
        } finally {
            pgClient.release();
            pool.end();
        }
    })();
};

const processRecords = async function (config, rowConfig, pgConfig) {
    const rowsToProcess = [];

    await removeMapRecords(rowConfig, pgConfig);

    return (async function () {
        await sql.connect(config);
        const request = new sql.Request();
        request.stream = true;
        request.query(rowConfig.sourceSql);

        request.on('row', (values) => {
            rowsToProcess.push(values);
            if (rowsToProcess.length >= 15) {
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
            console.error(`request.error${e.stack}`);
        });

        request.on('done', () => {
            console.log(`${rowConfig.recordType}  loading done`);
        });
    })();
};

sql.on('error', (sqlerror) => {
    console.error(`sql.error\n${sqlerror.stack}`);
});

const loadMsSqlData = async (pgConfig, mssqlConfig, config) =>
    new Promise((resolve, reject) => {
        try {
            (async function () {
                const res = await processRecords(mssqlConfig, config, pgConfig);
            })();
            return resolve(`${config.recordType} done`);
        } catch (error) {
            return reject(error);
        }
    });

exports.loadMsSqlData = loadMsSqlData;
