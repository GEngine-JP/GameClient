const ajax = require('../../src/ajax');

describe('ajax', () => {

  it('get text', done => {
    ajax('get', '/').then((res, xhr) => {
      xhr.responseText.should.eql('hello world');
      res.should.eql('hello world');
      done();
    });
  });

  it('get json', done => {
    ajax('get', '/json', null, {responseType: 'json'}).then((res) => {
      res.should.eql({a: 1, b: 2});
      done();
    });
  });

  it('bad json', done => {
    ajax('get', '/', null, {responseType: 'json'})
      .then((res) => {
        (1 === 1).should.be.false;
        done();
      })
      .catch((err) => {
        (err instanceof Error).should.be.true;
        done();
      });
  });

  it('complete', done => {
    ajax('get', '/', null, {responseType: 'text'}).complete((res) => {
      res.should.eql('hello world');
      done();
    });
  });

  it('post successed', done => {
    ajax('post', '/post', { a: 1 }, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.true;
      done();
    });
  });

  it('post failed', done => {
    ajax('post', '/post', { a: 2 }, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.false;
      done();
    });
  });

  it('put successed', done => {
    ajax('put', '/put', { a: 1 }, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.true;
      done();
    });
  });

  it('put failed', done => {
    ajax('put', '/put', { a: 2 }, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.false;
      done();
    });
  });

  it('delete successed', done => {
    ajax('delete', '/delete/1', {}, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.true;
      done();
    });
  });

  it('delete failed', done => {
    ajax('delete', '/delete/2', {}, { dataType: 'json', responseType: 'json' }).then(res => {
      res.success.should.be.false;
      done();
    });
  });

});
