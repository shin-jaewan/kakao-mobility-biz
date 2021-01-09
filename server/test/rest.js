const request = require('request');
const config = require('../config')();

exports.post = (body) => {
  return new Promise(function(resolve, reject) {
    const url = `http://localhost:${config.port}/api/v1/tx`;
    request({
      url: url,
      method: "POST",
      json: true,
      body: body
    }, function(error, response, result) {
      if(error) console.log('error ', error);
      // console.log('url: ' + url);
      // console.log('result ', result);
      resolve(result);
    });
  });
};
