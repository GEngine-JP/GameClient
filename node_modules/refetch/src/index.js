'use strict';

import ajax from './ajax';
import jsonp from './jsonp';
import { generateKey } from './util';
import { getCache, setCache } from './cache';

let peer = null;

function fetch(method, url, data, options) {
  options = options || {};
  let key = generateKey(method, url, data);
  let cache = options.cache;
  let promise;
  if (cache > 0) {
    promise = getCache(key);
    if (promise !== null) {
      return promise;
    }
  }
  if (method === 'jsonp') {
    promise = jsonp(url, data, options);
  } else {
    promise = ajax(method, url, data, options);
  }

  if (typeof peer === 'function') {
    promise = peer(promise);
  }

  if (cache > 0) {
    promise.then((res) => {
      if (!(res instanceof Error)) {
        setCache(key, res, cache);
      }
      return res;
    });
  }

  return promise;
}

module.exports = {
  get: (url, data, options) => {
    return fetch('get', url, data, options);
  },

  post: (url, data, options) => {
    return fetch('post', url, data, options);
  },

  put: (url, data, options) => {
    return fetch('put', url, data, options);
  },

  'delete': (url, data, options) => {
    return fetch('delete', url, data, options);
  },

  jsonp: (url, data, options) => {
    return fetch('jsonp', url, data, options);
  },

  setPeer: function (fn) {
    peer = fn;
    return this;
  }
};
