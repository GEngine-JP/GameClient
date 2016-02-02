import { toQueryString, solveUrl, generateKey } from '../../src/util';

describe('queryString', () => {

  it('solveUrl', () => {
    solveUrl('test.html', { b: 2 }).should.eql('test.html?b=2');
    solveUrl('test.html?a=1', { b: 2 }).should.eql('test.html?a=1&b=2');
    solveUrl('test.html?a=1&c=2', { b: 2 }).should.eql('test.html?a=1&c=2&b=2');
    solveUrl('test.html', { b: 'c&2' }).should.eql('test.html?b=c%262');
  });

  it('generateKey', () => {
    let key = generateKey('get', 'test.html', { a: 1 });
    key.should.eql('get:test.html:a=1');

    key = generateKey('get', 'test.html', { b: 2, a: 1 });
    key.should.eql('get:test.html:a=1&b=2');

    key = generateKey('get', 'http://www.example.com/very_lang_url.htl', { very: 1, long: 2, url: 3 });
    key.should.eql('d541b8fd9da758ee68be9fd8d6817fe1');

    key = generateKey('get', 'http://www.example.com/very_lang_url.htl', { very: 1, long: 2, url: 4 });
    key.should.eql('8d1dedd1e40b21b232e087e1e57f1876');
  });

});
