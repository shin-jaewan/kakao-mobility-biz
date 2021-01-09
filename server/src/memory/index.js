/*

  map 자료구조
  NAVI_DATA
  {
    key: "kakao20201113-0001",
    value: {
      isStart: true or false,
      dateTime: "202011131101020003",
      distance: 30000
    }
  }

  CLOSED_DATA
  {
    key: "kakao20201113-0001",
    value: "202011131101020003"
  }
*/

const db = require('../mysql');
const debug = require('debug')('km:map');

const ONE_HOUR = 60 * 60 * 1000; /* ms */
const ONE_DAY = 24 * 60 * 60 * 1000; /* ms */

const INTERVAL = 5 * 1000;
const RETRY_INTERVAL = 5 * 1000;

const REMAIN_DISTANCE = 100;
const MOVED_DISTANCE = 500;

let NAVI_DATA = new Map();
let CLOSED_DATA = new Map();
let worker = null;

function init() {
  try {
    // memory 초기화
    // todo 서버 재시작시 종료되지 않은 정보 로딩
    NAVI_DATA.clear();
    CLOSED_DATA.clear();

    startWorker();
  } catch (e) {
    console.log(e);
  } finally {}
}

// closed 된 데이터를 기반으로 result 정보 저장
function startWorker() {
  try {
    destroy();
    worker = setInterval(() => {
      debug(`Map size => Start:${NAVI_DATA.size} , Close: ${CLOSED_DATA.size}`);

      // 모든 상황이 종료된 경우(정상종료) => result table에 저장
      const data = [];
      for(let [tid, dateTime] of CLOSED_DATA) {
        // start 정보가 있는 경우 db에 저장
        if(NAVI_DATA.has(tid)) {
          const item = NAVI_DATA.get(tid);
          if(item.isStart) {
            // db에 저장할 데이터
            db.addResult(tid, dateTime);

            // 버퍼에서 삭제
            NAVI_DATA.delete(tid);
            CLOSED_DATA.delete(tid);
          }
        }
      }
    }, INTERVAL);
  } catch (e) {
    setTimeout(startWorker, RETRY_INTERVAL);
    console.log(e);
  } finally {}
}


function startNavi(tid, dateTime, distance) {
  try {
    if(!tid || !dateTime || !distance) return false;

    // update 정보가 먼저 저장된 경우
    if(NAVI_DATA.has(tid)) {
      const data = NAVI_DATA.get(tid);
      data.isStart = true;
      return true;
    }

    let data = {};
    data.isStart = true;
    data.dateTime = dateTime;
    data.distance = distance;
    NAVI_DATA.set(tid, data);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {}
}

function updateLocation(tid, dateTime, distance) {
  try {
    if(!tid || !dateTime || !distance) return false;

    // 데이터가 처음 들어온 경우
    if(!NAVI_DATA.has(tid)) {
      NAVI_DATA.set(tid, {
        isStart: false,
        dateTime,
        distance,
      });
    }

    const data = NAVI_DATA.get(tid);

    // 500m 이내 이동인 경우
    if(Math.abs(distance - data.distance) < MOVED_DISTANCE)
      return false;

    data.distance = distance;
    data.dateTime = dateTime;

    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {}
}

function closeNavi(tid, dateTime, distance) {
  try {
    if(!tid || !dateTime || distance > REMAIN_DISTANCE)
      return false;

    CLOSED_DATA.set(tid, dateTime);
    return true;
  } catch (e) {
    console.log(e);
  } finally {}
}

function destroy() {
  try {
    if(worker)
      clearInterval(worker);
  } catch (e) {
    console.log(e);
  } finally {}
}

module.exports = {
  init,

  startNavi,
  updateLocation,
  closeNavi,

  destroy
};
