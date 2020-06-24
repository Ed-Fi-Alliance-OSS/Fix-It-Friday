var { Connection, Request } = require("tedious");
var { Pool } = require("pg");

module.exports.process = function (pgConfig, mssqlConfig, contactPersonConfig) {
  const timeLabel = `${contactPersonConfig.recordType}-process`;

  console.log(`Processing ${contactPersonConfig.recordType} records`);

  var pool = new Pool(pgConfig);
  var connection = new Connection(mssqlConfig);

  connection.connect((err) => {
    if (err) {
      throw err;
    }

    var request = new Request(contactPersonConfig.sourceSql, () => {
      console.timeEnd(timeLabel);
      console.log("closing connection");
      connection.close();
    });

    request.on("done", () => {
      pool.close();
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
        args[0][7].value || null,
        args[0][8].value || "",
        args[0][9].value || "",
        args[0][10].value || null,
        args[0][11].value || null,
        args[0][12].value ? 1 : 0 || null,
        args[0][13].value || null,
        args[0][14].value || null,
        args[0][15].value || null,
      ];
      pool
        .query(contactPersonConfig.selectSql, [args[0][0].value])
        .then((res) => {
          if (res.rowCount == 0) {
            pool
              .query(contactPersonConfig.insertSql, values)
              .catch((err) => console.error(`An error occurred trying to insert this object:\n${JSON.stringify(args)}\n${err.stack}`));
          }
          if (res.rowCount == 1) {
            pool
              .query(contactPersonConfig.updateSql, values)
              .catch((err) => console.error(`An error occurred trying to update this object:\n${JSON.stringify(args)}\n${err.stack}`));
          }
        })
        .catch((err) => {/*console.error(err.stack)*/ });
    });
    console.time(timeLabel);
    connection.execSql(request);
  });
};
