const jsonp = require('../../src/jsonp');

describe('jsonp', () => {

  it('callback', done => {
    jsonp('/jsonp').then((res) => {
      res.success.should.be.true;
      done();
    });
  });

  it('callback param', done => {
    jsonp('/jsonp-cccbbb', null, { callback: 'cccbbb' }).then((res) => {
      res.success.should.be.true;
      done();
    });
  });

  it('timeout', done => {
    jsonp('/404', null, { timeout: 50 }).then((res) => {
      (1 === 1).should.be.false;
      done();
    }).catch((err) => {
      (err instanceof Error).should.be.true;
      done();
    });
  });

  it('callback with data success', done => {
    jsonp('/jsonp-data', { q: '123' }).then((res) => {
      res.success.should.be.true;
      done();
    });
  });

  it('callback with data failure', done => {
    jsonp('/jsonp-data', { q: '1234' }).then((res) => {
      res.success.should.be.false;
      done();
    });
  });

});
