'use strict';

import pinkySwear from 'pinkyswear';

const STORAGE_KEY = '517abb684366799b';
const storage = window && window.localStorage ? window.localStorage : null;

let CACHE = {};

if (storage) {
  let item = storage.getItem(STORAGE_KEY);
  if (item) {
    try {
      CACHE = JSON.parse(item) || {};
      clean();
    } catch (e) {
      console.warn(e);
    }
  }
}

export function getCache(key) {
  let data = CACHE[key];
  if (!data) {
    return null;
  }

  if (data.expire < new Date().getTime()) {
    setCache(key, null);
    return null;
  }

  let promise = pinkySwear((pinky) => {
    pinky.send = () => {
      promise(true, [data.data]);
    };

    pinky.complete = (f) => {
      return pinky.then(f, f);
    };

    pinky['catch'] = function (f) {
      return pinky.then(null, f);
    };

    pinky.cancel = function () {};

    return pinky;
  });

  promise.send();

  return promise;
}

export function setCache(key, data, expire=3600) {
  if (data === null) {
    delete CACHE[key];
  } else {
    expire *= 1000;
    CACHE[key] = {
      data,
      expire: new Date().getTime() + expire
    };
  }
  save();
}

// use single item handle expire
function save() {
  if (!storage) {
    return;
  }
  clean();
  storage.setItem(STORAGE_KEY, JSON.stringify(CACHE));
}

function clean() {
  let expire = new Date().getTime();
  Object.keys(CACHE).forEach((key) => {
    if (expire > (CACHE[key].expire || 0)) {
      delete CACHE[key];
    }
  });
}

