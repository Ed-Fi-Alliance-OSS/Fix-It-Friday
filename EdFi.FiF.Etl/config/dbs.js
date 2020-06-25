var pgConfig = {
	host: process.env.FIF_DBSERVER || '127.0.0.1',
    user: process.env.FIF_USER || 'pguser',
	password: process.env.FIF_PASSWORD || 'p@ssw0rd',
	database: process.env.FIF_DBNAME || 'FixItFriday',
	max: parseInt(process.env.FIF_MAX || 20),
	idleTimeoutMillis:  parseInt(process.env.ODS_IDLETIMEOUTMILLIS || 30000),
	connectionTimeoutMillis: parseInt(process.env.ODS_CONNECTIONTIMEOUTMILLIS || 2000),
};

var mssqlConfig = {
    user: 'ods_user',
    password: 'p@ssw0rd',
    database: 'ods-with-amt',
    server: 'localhost',
    port: 49412,
    requestTimeout: 300000,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    }
}
/* {
    user: process.env.ODS_USER || 'ods_user',
    password: process.env.ODS_PASSWORD,
    server: process.env.ODS_SERVER || 'localhost',
    database: process.env.ODS_DBNAME || 'ods_admin',
    port: parseInt(process.env.ODS_PORT || null),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
	options: {
		"enableArithAbort": process.env.ODS_ENABLEARITHABORT === 'true' || false,
		"encrypt": process.env.ODS_ENCRYPT === 'true' || false,
	}
};
*/

exports.pgConfig = pgConfig;
exports.mssqlConfig = mssqlConfig;
