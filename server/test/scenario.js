'use strict';

/*
  정상 시나리오 테스트
*/

const rest = require('./rest');

const body_start = {
  "type": "StartNavi",
  "location": {
    "transId": "kakao-test-0004",
    "dateTime": "202011131101020003",
    "totalDistance": 7000,
    "startName": "성남시청",
    "goalName": "카카오모빌리티",
    "lng": 127.567849497291,
    "lat": 36.957739187083654
  }
};

const body_update = {
  "type": "UpdateLocation",
  "location": {
    "transId": "kakao-test-0004",
    "dateTime": "202011131101020007",
    "remainDistance": 4500,
    "lng": 127.5678494971,
    "lat": 36.9577391883654
  }
};

const body_close = {
  "type": "Close",
  "location": {
    "transId": "kakao-test-0004",
    "dateTime": "202011131101020006",
    "remainDistance": 20,
    "lng": 127.5678494971,
    "lat": 36.9577391883654
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const NUM_OF_TX = 10;
const DISTANCE = NUM_OF_TX * 500;
async function run() {
  const transId = "kakao-test-" + Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  console.log("transId: " + transId);
  console.log(`정상 시나리오(10tx/sec) => start: 1개, update: ${NUM_OF_TX - 2}개, close: 1개`);

  await start(transId);
  await update(transId);
  await close(transId);

  console.log("finish!!");
}
// run after server start
setTimeout(run, 1000);

async function start(transId) {
  const now = new Date();
  body_start.location.transId = transId;
  body_start.location.totalDistance = DISTANCE;
  body_start.location.dateTime = now.yyyymmdd() + now.hhmmssmmmm();

  // console.log(body_start)
  await rest.post(body_start);
  console.log("Start");
}

async function update(transId) {
  for(let i = 0; i < NUM_OF_TX - 2; i++) {
    await sleep(100);
    const now = new Date();
    body_update.location.transId = transId;
    body_update.location.remainDistance = DISTANCE - ((i + 1) * 500);
    body_update.location.dateTime = now.yyyymmdd() + now.hhmmssmmmm();

    // console.log(body_update)
    await rest.post(body_update);
    process.stdout.write(".");
  }
}

async function close(transId) {
  const now = new Date();
  body_close.location.transId = transId;
  body_close.location.remainDistance = 0;
  body_close.location.dateTime = now.yyyymmdd() + now.hhmmssmmmm();

  // console.log(body_close)
  await rest.post(body_close);
  console.log("");
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
