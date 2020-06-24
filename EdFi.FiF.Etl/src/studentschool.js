var { Connection, Request } = require('tedious');
var { Pool } = require('pg');

module.exports.process = function (pgConfig, mssqlConfig, studentSchoolConfig) {

	console.log(`Processing ${studentSchoolConfig.recordType} records`);

	var pool = new Pool(pgConfig);
	var connection = new Connection(mssqlConfig);

		connection.connect((err) => {
		if (err) {
			throw err;
		}

		var request = new Request(studentSchoolConfig.sourceSql, () => {
			console.timeEnd("tedious");
			console.log('closing connection');
			connection.close();
				});

				request.on('done', () => {
					pool.close();
				});

		request.on('row', (...args) => {
			var values = [
				args[0][0].value || null,
				args[0][1].value || null,
				args[0][2].value || null,
				args[0][3].value || null,
				args[0][4].value || null,
				args[0][5].value || null,
				args[0][6].value || null,
				args[0][7].value || null,
				args[0][8].value || null,
				args[0][9].value || null,
				args[0][10].value ? 1 : 0,
				args[0][11].value || null,
			];
				pool.query(studentSchoolConfig.selectSql, [args[0][0].value])
				.then((res) => {
					if (res.rowCount == 0) {
						pool.query(studentSchoolConfig.insertSql, values).catch(err => console.error(err.stack));
					}
					if (res.rowCount == 1) {
						pool.query(studentSchoolConfig.updateSql, values).catch(err => console.error(err.stack));
					}
                })
				.catch(err => console.error(err.stack));
		});
		console.time("tedious");
		connection.execSql(request);
			});
};
