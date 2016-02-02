'use strict';

import md5 from 'blueimp-md5';
import param from 'jquery-param';

export function solveUrl (url, data) {
  let queryString = param(data);
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + queryString;
}

export function generateKey(method, url, data) {
  data = data || {};

  // sort by key
  let sorted = Object.keys(data).sort().map((key) => {
    return `${key}=${data[key]}`;
  });
  sorted = sorted.join('&');
  let key = `${method}:${url}:${sorted}`;

  // short key length
  if (key.length > 32) {
    key = md5(key);
  }
  return key;
}

