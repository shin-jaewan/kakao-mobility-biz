const httpMocks = require("node-mocks-http");
const should = require("should");

const transaction = require('../src/routes/v1/transaction').apis;
const sample = require('./data.json');

/*
  Transaction Rest API
*/
describe('Transaction Rest API ...', function() {
  beforeEach(function() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
  });

  describe('Transaction', function() {
    it('should get status', function(done) {
      res.on('end', function() {
        res.statusCode.should.be.equal(200);
        const resData = res._getData();
        resData.should.be.equal("true");

        return done();
      });
      transaction.status(req, res);
    });

    it('should get transaction id', function(done) {
      res.on('end', function() {
        res.statusCode.should.be.equal(200);
        const resData = res._getData();
        resData.should.be.equal("kakao20201113-0001");

        return done();
      });
      req.body = {
        "type": "StartNavi",
        "location": {
          "transId": "kakao20201113-0001",
          "dateTime": "202011131101020003",
          "totalDistance": 7000,
          "startName": "성남시청",
          "goalName": "카카오모빌리티",
          "lng": 127.567849497291,
          "lat": 36.957739187083654
        }
      };
      transaction.transaction(req, res);
    });

    it('should send 400 when the transaction id missing', function(done) {
      res.on('end', function() {
        res.statusCode.should.be.equal(400);

        return done();
      });
      req.body = {
        "type": "StartNavi",
        "location": {}
      };
      transaction.transaction(req, res);
    });
  });

  describe('Transaction scenario', function() {
    it('should store all transactions', function(done) {
      res.on('end', function() {
        res.statusCode.should.be.equal(200);
        const result = res._getData();
        result.should.equal(transId);

        return done();
      });
      let transId = "";
      for(let tx of sample) {
        transId = tx.location.transId;
        req.body = tx;
        transaction.transaction(req, res);
      }
    });
  });
});


/*
  memoryMap 테스트
*/

const memory = require("../src/memory");
describe('Memory map ...', function() {
  before(function() {
    memory.init();
  });
  after(function() {
    memory.destroy();
  });

  it('should store transaction ', function(done) {
    const tid = "kakao20201113-0001";
    const dateTime = "202011131101020003";
    const distance = 1000;
    let ret = false;
    ret = memory.startNavi(tid, dateTime, distance);
    ret.should.be.equal(true);
    ret = memory.updateLocation(tid, dateTime, distance - 500);
    ret.should.be.equal(true);
    ret = memory.closeNavi(tid, dateTime, 10);
    ret.should.be.equal(true);

    return done();
  });
});
