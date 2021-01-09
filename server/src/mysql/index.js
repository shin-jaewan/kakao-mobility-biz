const mysql = require("mysql2");
const config = require('../../config')();
const debug = require('debug')('km:db');

let conn;
(function handleDisconnect() {
  conn = mysql.createConnection(config.mysql);

  conn.connect(function(err) {
    if(err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }

    console.log("connect to mysql database!");
  });
  conn.on("error", function(err) {
    console.log("db error", err);
    if(err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
})();

// for bulk insert
const ObjToArray = (obj) => {
  var arr = obj instanceof Array;

  return (arr ? obj : Object.keys(obj)).map(function(i) {
    var val = arr ? i : obj[i];
    if(typeof val === 'object')
      return ObjToArray(val);
    else
      return val;
  });
};

const addStartData = (location) => {
  return new Promise(function(resolve, reject) {

    let sql = `
    INSERT INTO tb_tx_start(transId, dateTime, totalDistance, startName, goalName, lng, lat)
    VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
    dateTime = VALUES(dateTime), totalDistance = VALUES(totalDistance), startName = VALUES(startName),
    goalName = VALUES(goalName), lng = VALUES(lng),  lat = VALUES(lat);`;

    let params = [
      location.transId, location.dateTime, location.totalDistance,
      location.startName, location.goalName, location.lng, location.lat
    ];

    let con = conn.query(sql, params, function(error, results) {
      if(error) return reject(error);

      return resolve(results);
    });
    debug(con.sql);
  });
};

const addUpdateData = (location) => {
  return new Promise(function(resolve, reject) {

    let sql = `
    INSERT INTO tb_tx_update(transId, dateTime, remainDistance, lng, lat)
    VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
    dateTime = VALUES(dateTime), remainDistance = VALUES(remainDistance),
    lng = VALUES(lng), lat = VALUES(lat);`;

    let params = [
      location.transId, location.dateTime, location.remainDistance,
      location.lng, location.lat
    ];

    let con = conn.query(sql, params, function(error, results) {
      if(error) return reject(error);

      return resolve(results);
    });
    debug(con.sql);
  });
};

const addCloseData = (location) => {
  return new Promise(function(resolve, reject) {

    let sql = `
    INSERT INTO tb_tx_close(transId, dateTime, remainDistance, lng, lat)
    VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
    dateTime = VALUES(dateTime), remainDistance = VALUES(remainDistance),
    lng = VALUES(lng), lat = VALUES(lat);`;

    let params = [
      location.transId, location.dateTime, location.remainDistance,
      location.lng, location.lat
    ];

    let con = conn.query(sql, params, function(error, results) {
      if(error) return reject(error);

      return resolve(results);
    });
    debug(con.sql);
  });
};

const addResult = (tid, dateTime) => {
  return new Promise(function(resolve, reject) {

    let sql = `
    INSERT INTO tb_result(transId, dateTime)
    VALUES (?, ?) ON DUPLICATE KEY UPDATE
    dateTime = VALUES(dateTime);`;

    let con = conn.query(sql, [tid, dateTime], function(error, results) {
      if(error) return reject(error);

      return resolve(results);
    });
    debug(con.sql);
  });
};

// not used
const bulkResult = (data) => {
  return new Promise(function(resolve, reject) {

    if(!data || !data.length) return reject();

    const params = ObjToArray(data);

    let sql = `
    INSERT INTO tb_result(transId, dateTime)
    VALUES ? ON DUPLICATE KEY UPDATE
    dateTime = VALUES(dateTime);`;

    let con = conn.query(sql, [params], function(error, results) {
      if(error) return reject(error);

      return resolve(results);
    });
    debug(con.sql);
  });
};

module.exports = {
  addStartData,
  addUpdateData,
  addCloseData,
  addResult,
};
