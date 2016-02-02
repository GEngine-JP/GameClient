'use strict';

import qwest from './qwest';

module.exports = function ajax (mothed, url, data, options) {
  return qwest[mothed](url, data, options);
};
