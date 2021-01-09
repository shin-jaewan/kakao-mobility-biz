const express = require('express');
const router = express.Router();
const config = require('../../config')();
const debug = require('debug')('km:route');

router.get('/', function(req, res, next) {
  let result = `starting with ENV : ${config.env}`;
  debug(result);

  res.send(result);
});

module.exports = router;
