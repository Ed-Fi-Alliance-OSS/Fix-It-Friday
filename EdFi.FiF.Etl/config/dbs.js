var pgConfig = {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'p@ssw0rd',
    database: 'FixItFriday',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

var mssqlConfig = {
    "server": "127.0.0.1",
    "authentication": {
        "type": "default",
        "options": {
            "userName": "ods_user",
            "password": "p@ssw0rd"
        }
    },
    "options": {
        "port": 49412,
        "trustServerCertificate": false,
        "enableArithAbort": true,
        "database": "ods-with-amt",
        "encrypt": false
    }
};

exports.pgConfig = pgConfig;
exports.mssqlConfig = mssqlConfig;
