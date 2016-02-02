import { getCache, setCache } from '../../src/cache';

describe('cache', () => {

  it('get null', () => {
    (getCache('none') === null).should.be.true;
  });

  it('get data', (done) => {
    setCache('test', { a: 1 });

    getCache('test').then((res) => {
      res.should.eql({ a: 1 });
      return res;
    }).complete((res) => {
      res.should.eql({ a: 1 });
      done();
    });
  });

  it('over time', (done) => {
    setCache('test', { a: 1 }, 0.5);

    setTimeout(() => {
      (getCache('test') === null).should.be.true;
      done();
    }, 600);
  });

});
