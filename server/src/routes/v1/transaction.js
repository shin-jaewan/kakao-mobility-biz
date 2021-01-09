/*
	[TODO]
*/

const db = require('../../mysql');
const express = require('express');
const router = express.Router();
const map = require('../../memory');

const debug = require('debug')('km:tx');

/**
 * @swagger
 * /v1/http/status:
 *   get:
 *     summary: 서버 작동여부 확인(테스트 용)
 *     tags: [ transaction ]
 *     responses:
 *       200:
 *         description: 성공
 */


const status = function(req, res) {
  try {
    res.send(true);
  } catch (e) {
    debug(e);
    throw new Error(e);
  } finally {}
};
router.get('/status', status);

/**
 * @swagger
 * /v1/http/transaction:
 *   post:
 *     summary: 실시간 데이터 저장
 *     tags: [ transaction ]
 *     responses:
 *       200:
 *         description: 성공
 */

const transaction = function(req, res) {
  const body = req.body;
  debug("request body: ", body);

  try {
    const type = body.type;
    const location = body.location;
    const tid = location.transId;
    let dateTime = location.dateTime.substr(0, 14);
    // dateTime = new Date(dateTime.replace(
    //   /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
    //   '$4:$5:$6 $2/$3/$1'
    // ));

    debug("type: ", type, tid);
    switch (type) {
      case "StartNavi":
        setStartNavi(res, tid, dateTime, location);
        break;
      case "UpdateLocation":
        setUpdateLocation(res, tid, dateTime, location);
        break;
      case "Close":
        setClose(res, tid, dateTime, location);
        break;
      default:
        res.status(400).send("Wrong transaction type!!");
        break;
    }
  } catch (e) {
    debug(e);
    res.status(400).send(e.message);
  } finally {}
};
router.post('/', transaction);

//

const setStartNavi = function(res, tid, dateTime, location) {
  const ret = map.startNavi(tid, dateTime, location.totalDistance);
  if(!ret) {
    debug("error setStartNavi", location);
    return res.send(false);
  }

  // db 저장
  db.addStartData(location)
    .then(res.send(tid))
    .catch(res.send);
};
const setUpdateLocation = function(res, tid, dateTime, location) {
  const ret = map.updateLocation(tid, dateTime, location.remainDistance);
  if(!ret) {
    debug("error setUpdateLocation", location);
    return res.send(false);
  }

  // db 저장
  db.addUpdateData(location)
    .then(res.send(tid))
    .catch(res.send);
};
const setClose = function(res, tid, dateTime, location) {
  const ret = map.closeNavi(tid, dateTime, location.remainDistance);
  if(!ret) {
    debug("error setClose", location);
    return res.send(false);
  }

  // db 저장
  db.addCloseData(location)
    .then(res.send(tid))
    .catch(res.send);
};

module.exports.router = router;
module.exports.apis = {
  status,
  transaction
};
