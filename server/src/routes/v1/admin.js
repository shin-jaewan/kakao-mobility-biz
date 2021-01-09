/*

	[TODO]
  실시간 정보 & 결과 정보 모니터링
*/

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /v1/admin:
 *   get:
 *     summary: 실시간 데이터 가져오기
 *     tags: [ admin ]
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', function(req, res, next) {
  res.send("Navi 종료 정보 모니터링");
});

module.exports = router;
