var { Connection, Request } = require("tedious");
var { Pool } = require("pg");

module.exports.process = function (pgConfig, mssqlConfig, config) {
  const timeLabel = `${config.recordType}-process`;

  console.log(`Processing ${config.recordType} records`);

  var pool = new Pool(pgConfig);
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

    request.on("done", result => {
      pool.close();
      console.log(`${config.recordType} process done`);
    });

    request.on("row", (...args) => {
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
      pool
        .query(config.selectSql, [args[0][0].value])
        .then((res) => {
          if (res.rowCount == 0) {
            pool
              .query(config.insertSql, values)
              .catch((err) => {
                // console.error(
                //     `An error occurred trying to insert ${
                //       config.recordType
                //     } object:\n${JSON.stringify(args)}\n${err.stack}`
                //   );
              });
          }
          if (res.rowCount == 1) {
            pool
              .query(config.updateSql, values)
              .catch((err) => {
                // console.error(
                //     `An error occurred trying to update ${
                //       config.recordType
                //     } object:\n${JSON.stringify(args)}\n${err.stack}`
                //   );
              }
              );
          }
        })
        .catch((err) => {/* console.error(err.stack)*/});
    });
    console.time(timeLabel);
    connection.execSql(request);
  });
};