/*
- generateFakeData.js
- generateFakeData.js 파일은 artillery yaml file이 있는 같은 folder에 저장
*/
'use strict';

module.exports = {
  init,
  initDistance,

  getStartTx,
  getUpdateTx,
  getCloseTx,
};

let CURRENT_TX_ID = 0;
let DISTANCE = 100000 * 500;

function init(userContext, events, done) {
  CURRENT_TX_ID++;
  console.log("kakao-test-" + CURRENT_TX_ID.toString().padStart(4, "0"));
  return done();
}

function getStartTx(userContext, events, done) {
  DISTANCE = 100000 * 500;

  const now = new Date();
  const tx = {
    "transId": "kakao-test-" + CURRENT_TX_ID.toString().padStart(4, "0"),
    "dateTime": now.yyyymmdd() + now.hhmmssmmmm(),
    "totalDistance": DISTANCE, // 10 mins
  };

  userContext.vars.transId = tx.transId;
  userContext.vars.dateTime = tx.dateTime;
  userContext.vars.totalDistance = tx.totalDistance;
  console.log("start: " + userContext.vars.transId);
  // console.log(userContext.vars.transId);
  // console.log(userContext.vars.dateTime);
  // console.log(userContext.vars.totalDistance);
  // console.log("=====================");
  return done();
}

function initDistance(userContext, events, done) {
  DISTANCE = 100000 * 500;
  return done();
}

function getUpdateTx(userContext, events, done) {
  DISTANCE = DISTANCE - 500;

  const now = new Date();
  const tx = {
    "transId": "kakao-test-" + CURRENT_TX_ID.toString().padStart(4, "0"),
    "dateTime": now.yyyymmdd() + now.hhmmssmmmm(),
    "remainDistance": DISTANCE, // 10 mins
  };

  userContext.vars.transId = tx.transId;
  userContext.vars.dateTime = tx.dateTime;
  userContext.vars.remainDistance = tx.remainDistance;
  console.log("update: " + userContext.vars.remainDistance);
  // console.log(userContext.vars.transId);
  // console.log(userContext.vars.dateTime);
  // console.log(userContext.vars.remainDistance);
  // console.log("=====================");
  return done();
}


function getCloseTx(userContext, events, done) {
  const now = new Date();
  const tx = {
    "transId": "kakao-test-" + CURRENT_TX_ID.toString().padStart(4, "0"),
    "dateTime": now.yyyymmdd() + now.hhmmssmmmm(),
    "remainDistance": 0,
  };

  userContext.vars.transId = tx.transId;
  userContext.vars.dateTime = tx.dateTime;
  userContext.vars.remainDistance = tx.remainDistance;
  console.log("close: " + userContext.vars.transId);
  // console.log(userContext.vars.transId);
  // console.log(userContext.vars.dateTime);
  // console.log(userContext.vars.remainDistance);
  // console.log("=====================");
  return done();
}


Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [
    this.getFullYear(),
    mm.toString().padStart(2, "0"),
    dd.toString().padStart(2, "0")
  ].join('');
};

Date.prototype.hhmmssmmmm = function() {
  var hh = this.getHours();
  var mm = this.getMinutes();
  var ss = this.getSeconds();
  var mmmm = this.getMilliseconds();

  return [
    hh.toString().padStart(2, "0"),
    mm.toString().padStart(2, "0"),
    ss.toString().padStart(2, "0"),
    mmmm.toString().padStart(4, "0")
  ].join('');
};
