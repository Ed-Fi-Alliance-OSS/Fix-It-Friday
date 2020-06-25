var pgConfig = {
	host: process.env.FIF_DBSERVER || '127.0.0.1',
    user: process.env.FIF_USER || 'postgres',
	password: process.env.FIF_PASSWORD || 'p@ssw0rd',
	database: process.env.FIF_DBNAME || 'FixItFriday',
	max: parseInt(process.env.FIF_MAX || 20),
	idleTimeoutMillis:  parseInt(process.env.FIF_IDLETIMEOUTMILLIS || 30000),
	connectionTimeoutMillis: parseInt(process.env.FIF_CONNECTIONTIMEOUTMILLIS || 2000),
};

var mssqlConfig = {
    "server": process.env.ODS_SERVER || "127.0.0.1",
    "authentication": {
        "type": "default",
        "options": {
            "userName": process.env.ODS_USER || "ods_user",
            "password": process.env.ODS_PASSWORD || "p@ssw0rd"
        }
    },
    "options": {
        "port": parseInt(process.env.ODS_PORT) || 49412,
        "trustServerCertificate": process.env.ODS_TRUSTSERVERCERTIFICATE === 'true' || false,
        "enableArithAbort":  process.env.ODS_ENABLEARITHABORT === 'true' || true,
        "database": process.env.ODS_DBNAME || "ods-with-amt",
        "encrypt": process.env.ODS_ENCRYPT === 'true' || false
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
