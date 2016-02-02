import fetch from '../../src';

describe('fetch', () => {

  it('get', (done) => {
    fetch.get('/').then(res => {
      res.should.eql('hello world');
      done();
    });
  });

  it('get cache delay', (done) => {
    let tm;
    fetch.get('/cache', null, { cache: 0.1, responseType: 'json' }).then(res => {
      tm = res.time;
    }).then(() => {
      fetch.get('/cache', null, { cache: 500 }).then(res => {
        res.time.should.eql(tm);
      });
    }).then(() => {
      fetch.get('/cache', null, { cache: 0, delay: 500 }).then(res => {
        (res.time - tm > 300).should.be.true;
        done();
      });
      fetch.get('/cache', null, { cache: 0, delay: 100 }).then(res => {
        res.time.should.not.eql(tm);
        tm = res.time;
      });
    });
  });

  it('jsonp cache delay', (done) => {
    let tm;
    fetch.jsonp('/jsonp-delay', null, { cache: 0.1 }).then(res => {
      tm = res.time;
    }).then(() => {
      fetch.jsonp('/jsonp-delay', null, { cache: 500 }).then(res => {
        res.time.should.eql(tm);
      });
    }).then(() => {
      fetch.jsonp('/jsonp-delay', null, { cache: 0, delay: 500 }).then(res => {
        (res.time - tm > 300).should.be.true;
        done();
      });
      fetch.jsonp('/jsonp-delay', null, { cache: 0, delay: 100 }).then(res => {
        res.time.should.not.eql(tm);
        tm = res.time;
      });
    });
  });

  it('custom peer success', (done) => {
    fetch.setPeer(
      (promise) => promise.then((res) => {
        if (res.success) {
          return true;
        } else {
          return new Error(res.msg);
        }
      })
      .catch((res) => {
        res.message.should.eql('timeout');
        done();
      })
    );

    fetch.jsonp('/jsonp-data', {q: 1234}).then(res => {
      res.message.should.eql("expect q === '123'");
    }).then(() => {
      return fetch.jsonp('/jsonp-data', {q: 123});
    }).then(res => {
      res.should.be.true;
      return fetch.jsonp('/404', null, {timeout: 50});
    });
  });
});
