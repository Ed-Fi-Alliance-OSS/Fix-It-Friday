var { Connection, Request } = require("tedious");
var { Pool } = require("pg");

const loadRecords = function (pgConfig, mssqlConfig, config) {
	const timeLabel = `${config.recordType}-process`;

	console.log(`Processing ${config.recordType} records`);

	var pool = new Pool(pgConfig);
	pool.query(config.deleteSql).then(() => { console.log(`All ${config.recordType} records deleted`)});

	var connection = new Connection(mssqlConfig);

	connection.connect((err) => {
		if (err) {
			throw err;
		}

		var request = new Request(config.sourceSql, () => {
			console.timeEnd(timeLabel);
			console.log(`closing ${config.recordType} connection`);
			connection.close();
		});

		request.on("done", () => {
			pool.close();
			console.log(`${config.recordType} process done`);
		});

		request.on("row", (...args) => {
			var values = [
				args[0][0].value || "",
                args[0][1].value || "",
                args[0][2].value || "",
                args[0][3].value || "",
				args[0][4].value || "",
                args[0][5].value || "",
                args[0][6].value || "",
                args[0][7].value || "",
				args[0][8].value || "",
                args[0][9].value || "",
                args[0][10].value || "",
                args[0][11].value || "",
			];

			pool
				.query(config.insertSql, values)
				.catch((err) => {
					console.error(`An error occurred trying to insert ${config.recordType}:\n${JSON.stringify(args)}\n${err.stack}`)
					});
		});
		console.time(timeLabel);
		connection.execSql(request);
	});
};


const process = function (pgConfig, mssqlConfig, config) {
    return new Promise((resolve, reject) => {
        try {
            loadRecords(pgConfig, mssqlConfig, config);
            return resolve(`${config.recordType} done`);
        } catch (error) {
            return reject(error);
        }
    });
};

exports.process = process;
