/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "test/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);
	__webpack_require__(10);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(17);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ajax = __webpack_require__(3);

	describe('ajax', function () {

	  it('get text', function (done) {
	    ajax('get', '/').then(function (res, xhr) {
	      xhr.responseText.should.eql('hello world');
	      res.should.eql('hello world');
	      done();
	    });
	  });

	  it('get json', function (done) {
	    ajax('get', '/json', null, { responseType: 'json' }).then(function (res) {
	      res.should.eql({ a: 1, b: 2 });
	      done();
	    });
	  });

	  it('bad json', function (done) {
	    ajax('get', '/', null, { responseType: 'json' }).then(function (res) {
	      (1 === 1).should.be.false;
	      done();
	    }).catch(function (err) {
	      (err instanceof Error).should.be.true;
	      done();
	    });
	  });

	  it('complete', function (done) {
	    ajax('get', '/', null, { responseType: 'text' }).complete(function (res) {
	      res.should.eql('hello world');
	      done();
	    });
	  });

	  it('post successed', function (done) {
	    ajax('post', '/post', { a: 1 }, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('post failed', function (done) {
	    ajax('post', '/post', { a: 2 }, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.false;
	      done();
	    });
	  });

	  it('put successed', function (done) {
	    ajax('put', '/put', { a: 1 }, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('put failed', function (done) {
	    ajax('put', '/put', { a: 2 }, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.false;
	      done();
	    });
	  });

	  it('delete successed', function (done) {
	    ajax('delete', '/delete/1', {}, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('delete failed', function (done) {
	    ajax('delete', '/delete/2', {}, { dataType: 'json', responseType: 'json' }).then(function (res) {
	      res.success.should.be.false;
	      done();
	    });
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _qwest = __webpack_require__(4);

	var _qwest2 = _interopRequireDefault(_qwest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ajax(mothed, url, data, options) {
	  return _qwest2.default[mothed](url, data, options);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*! qwest 2.2.6 (https://github.com/pyrsmk/qwest) */
	// add delay option

	module.exports = (function () {

		var global = window || this,
		    pinkyswear = __webpack_require__(5),
		    jparam = __webpack_require__(9),
		   
		// Default response type for XDR in auto mode
		defaultXdrResponseType = 'json',
		   
		// Default data type
		defaultDataType = 'post',
		   
		// Variables for limit mechanism
		_limit = null,
		    requests = 0,
		    request_stack = [],
		   
		// Get XMLHttpRequest object
		getXHR = function getXHR() {
			return global.XMLHttpRequest ? new global.XMLHttpRequest() : new global.ActiveXObject('Microsoft.XMLHTTP');
		},
		   
		// Guess XHR version
		xhr2 = getXHR().responseType === '',
		   

		// Core function
		qwest = function qwest(method, url, data, options, before) {

			// Format
			method = method.toUpperCase();
			data = data || null;
			options = options || {};

			// Define variables
			var nativeResponseParsing = false,
			    crossOrigin,
			    xhr,
			    xdr = false,
			   
			//timeoutInterval,
			//aborted = false,
			attempts = 0,
			    headers = {},
			    mimeTypes = {
				text: '*/*',
				xml: 'text/xml',
				json: 'application/json',
				post: 'application/x-www-form-urlencoded'
			},
			    accept = {
				text: '*/*',
				xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
				json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
			},
			    vars = '',
			   
			//serialized,
			response,
			    sending = false,
			   
			//delayed = false,
			timeout_start,
			   

			// Create the promise
			promise = pinkyswear(function (pinky) {
				pinky['catch'] = function (f) {
					return pinky.then(null, f);
				};
				pinky.complete = function (f) {
					return pinky.then(f, f);
				};
				// Override
				if ('pinkyswear' in options) {
					for (var i in options.pinkyswear) {
						pinky[i] = options.pinkyswear[i];
					}
				}
				pinky.send = function () {
					// Prevent further send() calls
					if (sending) {
						return;
					}
					// Reached request limit, get out!
					if (requests == _limit) {
						request_stack.push(pinky);
						return;
					}
					++requests;
					sending = true;
					// Start the chrono
					timeout_start = new Date().getTime();
					// Get XHR object
					xhr = getXHR();
					if (crossOrigin) {
						if (!('withCredentials' in xhr) && global.XDomainRequest) {
							xhr = new XDomainRequest(); // CORS with IE8/9
							xdr = true;
							if (method != 'GET' && method != 'POST') {
								method = 'POST';
							}
						}
					}
					// Open connection
					if (xdr) {
						xhr.open(method, url);
					} else {
						xhr.open(method, url, options.async, options.user, options.password);
						if (xhr2 && options.async) {
							xhr.withCredentials = options.withCredentials;
						}
					}
					// Set headers
					if (!xdr) {
						for (var i in headers) {
							if (headers[i]) {
								xhr.setRequestHeader(i, headers[i]);
							}
						}
					}
					// Verify if the response type is supported by the current browser
					if (xhr2 && options.responseType != 'document' && options.responseType != 'auto') {
						// Don't verify for 'document' since we're using an internal routine
						try {
							xhr.responseType = options.responseType;
							nativeResponseParsing = xhr.responseType == options.responseType;
						} catch (e) {}
					}
					// Plug response handler
					if (xhr2 || xdr) {
						xhr.onload = handleResponse;
						xhr.onerror = handleError;
					} else {
						xhr.onreadystatechange = function () {
							if (xhr.readyState == 4) {
								handleResponse();
							}
						};
					}
					// Override mime type to ensure the response is well parsed
					if (options.responseType != 'auto' && 'overrideMimeType' in xhr) {
						xhr.overrideMimeType(mimeTypes[options.responseType]);
					}
					// Run 'before' callback
					if (before) {
						before(xhr);
					}
					// Send request
					if (xdr) {
						// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
						xhr.onprogress = function () {};
						xhr.ontimeout = function () {};
						xhr.onerror = function () {};
						// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
						setTimeout(function () {
							xhr.send(method != 'GET' ? data : null);
						}, 0);
					} else {
						xhr.send(method != 'GET' ? data : null);
					}
				};
				return pinky;
			}),
			   

			// Handle the response
			handleResponse = function handleResponse() {
				// Prepare
				var responseType;
				--requests;
				sending = false;
				// Verify timeout state
				// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
				if (new Date().getTime() - timeout_start >= options.timeout) {
					if (!options.attempts || ++attempts != options.attempts) {
						promise.send();
					} else {
						promise(false, [new Error('Timeout (' + url + ')')], response, xhr);
					}
					return;
				}
				// Launch next stacked request
				if (request_stack.length) {
					request_stack.shift().send();
				}
				// Handle response
				try {
					// Process response
					if (nativeResponseParsing && 'response' in xhr && xhr.response !== null) {
						response = xhr.response;
					} else if (options.responseType == 'document') {
						var frame = document.createElement('iframe');
						frame.style.display = 'none';
						document.body.appendChild(frame);
						frame.contentDocument.open();
						frame.contentDocument.write(xhr.response);
						frame.contentDocument.close();
						response = frame.contentDocument;
						document.body.removeChild(frame);
					} else {
						// Guess response type
						responseType = options.responseType;
						if (responseType == 'auto') {
							if (xdr) {
								responseType = defaultXdrResponseType;
							} else {
								var ct = xhr.getResponseHeader('Content-Type') || '';
								if (ct.indexOf(mimeTypes.json) > -1) {
									responseType = 'json';
								} else if (ct.indexOf(mimeTypes.xml) > -1) {
									responseType = 'xml';
								} else {
									responseType = 'text';
								}
							}
						}
						// Handle response type
						switch (responseType) {
							case 'json':
								try {
									if ('JSON' in global) {
										response = JSON.parse(xhr.responseText);
									} else {
										response = eval('(' + xhr.responseText + ')');
									}
								} catch (e) {
									throw 'Error while parsing JSON body : ' + e;
								}
								break;
							case 'xml':
								// Based on jQuery's parseXML() function
								try {
									// Standard
									if (global.DOMParser) {
										response = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
									}
									// IE<9
									else {
											response = new global.ActiveXObject('Microsoft.XMLDOM');
											response.async = 'false';
											response.loadXML(xhr.responseText);
										}
								} catch (e) {
									response = undefined;
								}
								if (!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
									throw 'Invalid XML';
								}
								break;
							default:
								response = xhr.responseText;
						}
					}
					// Late status code verification to allow passing data when, per example, a 409 is returned
					// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
					if ('status' in xhr && !/^2|1223/.test(xhr.status)) {
						throw xhr.status + ' (' + xhr.statusText + ')';
					}
					// Fulfilled
					promise(true, [response, xhr]);
				} catch (e) {
					// Rejected
					if (typeof e === 'string') {
						e = new Error(e);
					}
					promise(false, [e, response, xhr]);
				}
			},
			   

			// Handle errors
			handleError = function handleError() {
				--requests;
				promise(false, [new Error('Connection aborted'), null, xhr]);
			};

			// Normalize options
			options.async = 'async' in options ? !!options.async : true;
			options.cache = 'cache' in options ? !!options.cache : false;
			options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : defaultDataType;
			options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
			options.user = options.user || '';
			options.password = options.password || '';
			options.withCredentials = !!options.withCredentials;
			options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
			options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

			// Guess if we're dealing with a cross-origin request
			i = url.match(/\/\/(.+?)\//);
			crossOrigin = i && (i[1] ? i[1] != location.host : false);

			// Prepare data
			if ('ArrayBuffer' in global && data instanceof ArrayBuffer) {
				options.dataType = 'arraybuffer';
			} else if ('Blob' in global && data instanceof Blob) {
				options.dataType = 'blob';
			} else if ('Document' in global && data instanceof Document) {
				options.dataType = 'document';
			} else if ('FormData' in global && data instanceof FormData) {
				options.dataType = 'formdata';
			}
			switch (options.dataType) {
				case 'json':
					data = JSON.stringify(data);
					break;
				case 'post':
					data = jparam(data);
			}

			// Prepare headers
			if (options.headers) {
				var format = function format(match, p1, p2) {
					return p1 + p2.toUpperCase();
				};
				for (var i in options.headers) {
					headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i];
				}
			}
			if (!('Content-Type' in headers) && method != 'GET') {
				if (options.dataType in mimeTypes) {
					if (mimeTypes[options.dataType]) {
						headers['Content-Type'] = mimeTypes[options.dataType];
					}
				}
			}
			if (!headers.Accept) {
				headers.Accept = options.responseType in accept ? accept[options.responseType] : '*/*';
			}
			if (!crossOrigin && !('X-Requested-With' in headers)) {
				// (that header breaks in legacy browsers with CORS)
				headers['X-Requested-With'] = 'XMLHttpRequest';
			}
			if (!options.cache && !('Cache-Control' in headers)) {
				headers['Cache-Control'] = 'no-cache';
			}

			// Prepare URL
			if (method == 'GET' && data) {
				vars += data;
			}
			if (vars) {
				url += (/\?/.test(url) ? '&' : '?') + vars;
			}

			// Start the request
			if (options.async) {
				if (options.delay > 0) {
					setTimeout(function () {
						promise.send();
					}, options.delay);
				} else {
					promise.send();
				}
			}

			// Return promise
			return promise;
		};

		// Return the external qwest object
		return {
			base: '',
			get: function get(url, data, options, before) {
				return qwest('GET', this.base + url, data, options, before);
			},
			post: function post(url, data, options, before) {
				return qwest('POST', this.base + url, data, options, before);
			},
			put: function put(url, data, options, before) {
				return qwest('PUT', this.base + url, data, options, before);
			},
			'delete': function _delete(url, data, options, before) {
				return qwest('DELETE', this.base + url, data, options, before);
			},
			map: function map(type, url, data, options, before) {
				return qwest(type.toUpperCase(), this.base + url, data, options, before);
			},
			xhr2: xhr2,
			limit: function limit(by) {
				_limit = by;
			},
			setDefaultXdrResponseType: function setDefaultXdrResponseType(type) {
				defaultXdrResponseType = type.toLowerCase();
			},
			setDefaultDataType: function setDefaultDataType(type) {
				defaultDataType = type.toLowerCase();
			}
		};
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, setImmediate, process) {'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/*
	 * PinkySwear.js 2.2.2 - Minimalistic implementation of the Promises/A+ spec
	 * 
	 * Public Domain. Use, modify and distribute it any way you like. No attribution required.
	 *
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 *
	 * PinkySwear is a very small implementation of the Promises/A+ specification. After compilation with the
	 * Google Closure Compiler and gzipping it weighs less than 500 bytes. It is based on the implementation for 
	 * Minified.js and should be perfect for embedding. 
	 *
	 *
	 * PinkySwear has just three functions.
	 *
	 * To create a new promise in pending state, call pinkySwear():
	 *         var promise = pinkySwear();
	 *
	 * The returned object has a Promises/A+ compatible then() implementation:
	 *          promise.then(function(value) { alert("Success!"); }, function(value) { alert("Failure!"); });
	 *
	 *
	 * The promise returned by pinkySwear() is a function. To fulfill the promise, call the function with true as first argument and
	 * an optional array of values to pass to the then() handler. By putting more than one value in the array, you can pass more than one
	 * value to the then() handlers. Here an example to fulfill a promsise, this time with only one argument: 
	 *         promise(true, [42]);
	 *
	 * When the promise has been rejected, call it with false. Again, there may be more than one argument for the then() handler:
	 *         promise(true, [6, 6, 6]);
	 *         
	 * You can obtain the promise's current state by calling the function without arguments. It will be true if fulfilled,
	 * false if rejected, and otherwise undefined.
	 * 		   var state = promise(); 
	 * 
	 * https://github.com/timjansen/PinkySwear.js
	 */
	(function (target) {
		var undef;

		function isFunction(f) {
			return typeof f == 'function';
		}
		function isObject(f) {
			return (typeof f === 'undefined' ? 'undefined' : _typeof(f)) == 'object';
		}
		function defer(callback) {
			if (typeof setImmediate != 'undefined') setImmediate(callback);else if (typeof process != 'undefined' && process['nextTick']) process['nextTick'](callback);else setTimeout(callback, 0);
		}

		target[0][target[1]] = function pinkySwear(extend) {
			var state; // undefined/null = pending, true = fulfilled, false = rejected
			var values = []; // an array of values as arguments for the then() handlers
			var deferred = []; // functions to call when set() is invoked

			var set = function set(newState, newValues) {
				if (state == null && newState != null) {
					state = newState;
					values = newValues;
					if (deferred.length) defer(function () {
						for (var i = 0; i < deferred.length; i++) {
							deferred[i]();
						}
					});
				}
				return state;
			};

			set['then'] = function (onFulfilled, onRejected) {
				var promise2 = pinkySwear(extend);
				var callCallbacks = function callCallbacks() {
					try {
						var f = state ? onFulfilled : onRejected;
						if (isFunction(f)) {
							(function () {
								var resolve = function resolve(x) {
									var then,
									    cbCalled = 0;
									try {
										if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
											if (x === promise2) throw new TypeError();
											then['call'](x, function () {
												if (! cbCalled++) resolve.apply(undef, arguments);
											}, function (value) {
												if (! cbCalled++) promise2(false, [value]);
											});
										} else promise2(true, arguments);
									} catch (e) {
										if (! cbCalled++) promise2(false, [e]);
									}
								};

								resolve(f.apply(undef, values || []));
							})();
						} else promise2(state, values);
					} catch (e) {
						promise2(false, [e]);
					}
				};
				if (state != null) defer(callCallbacks);else deferred.push(callCallbacks);
				return promise2;
			};
			if (extend) {
				set = extend(set);
			}
			return set;
		};
	})( false ? [window, 'pinkySwear'] : [module, 'exports']);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module), __webpack_require__(7).setImmediate, __webpack_require__(8)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {"use strict";

	var nextTick = __webpack_require__(8).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).setImmediate, __webpack_require__(7).clearImmediate))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
	 */
	(function (global) {
	    'use strict';

	    var param = function param(a) {
	        var s = [],
	            rbracket = /\[\]$/,
	            isArray = function isArray(obj) {
	            return Object.prototype.toString.call(obj) === '[object Array]';
	        },
	            add = function add(k, v) {
	            v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
	            s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
	        },
	            buildParams = function buildParams(prefix, obj) {
	            var i, len, key;

	            if (prefix) {
	                if (isArray(obj)) {
	                    for (i = 0, len = obj.length; i < len; i++) {
	                        if (rbracket.test(prefix)) {
	                            add(prefix, obj[i]);
	                        } else {
	                            buildParams(prefix + '[' + (_typeof(obj[i]) === 'object' ? i : '') + ']', obj[i]);
	                        }
	                    }
	                } else if (obj && String(obj) === '[object Object]') {
	                    for (key in obj) {
	                        buildParams(prefix + '[' + key + ']', obj[key]);
	                    }
	                } else {
	                    add(prefix, obj);
	                }
	            } else if (isArray(obj)) {
	                for (i = 0, len = obj.length; i < len; i++) {
	                    add(obj[i].name, obj[i].value);
	                }
	            } else {
	                for (key in obj) {
	                    buildParams(key, obj[key]);
	                }
	            }
	            return s;
	        };

	        return buildParams('', a).join('&').replace(/%20/g, '+');
	    };

	    if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	        module.exports = param;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return param;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        global.param = param;
	    }
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var jsonp = __webpack_require__(11);

	describe('jsonp', function () {

	  it('callback', function (done) {
	    jsonp('/jsonp').then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('callback param', function (done) {
	    jsonp('/jsonp-cccbbb', null, { callback: 'cccbbb' }).then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('timeout', function (done) {
	    jsonp('/404', null, { timeout: 50 }).then(function (res) {
	      (1 === 1).should.be.false;
	      done();
	    }).catch(function (err) {
	      (err instanceof Error).should.be.true;
	      done();
	    });
	  });

	  it('callback with data success', function (done) {
	    jsonp('/jsonp-data', { q: '123' }).then(function (res) {
	      res.success.should.be.true;
	      done();
	    });
	  });

	  it('callback with data failure', function (done) {
	    jsonp('/jsonp-data', { q: '1234' }).then(function (res) {
	      res.success.should.be.false;
	      done();
	    });
	  });
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pinkyswear = __webpack_require__(5);

	var _pinkyswear2 = _interopRequireDefault(_pinkyswear);

	var _util = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var count = 0;

	module.exports = function (url, data) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var promise = (0, _pinkyswear2.default)(function (pinky) {
	    var id = options.name || '__cb' + (new Date().getTime().toString() + count++).substr(-10);
	    var timeout = typeof options.timeout === 'number' ? options.timeout : 60000;
	    var script = undefined;
	    var timer = undefined;

	    function cleanup() {
	      if (script.parentNode) {
	        script.parentNode.removeChild(script);
	      }
	      window[id] = function () {};
	      if (timer) {
	        clearTimeout(timer);
	      }
	    }

	    pinky.send = function () {
	      if (timeout) {
	        timer = setTimeout(function () {
	          cleanup();
	          promise(false, [new Error('timeout')]);
	        }, timeout);
	      }

	      window[id] = function (res) {
	        cleanup();
	        promise(true, [res]);
	      };

	      // add qs component
	      var callback = options.callback || 'callback';
	      data = data || {};
	      data[callback] = id;
	      url = (0, _util.solveUrl)(url, data);

	      // create script
	      script = document.createElement('script');
	      script.src = url;
	      document.head.appendChild(script);
	    };

	    pinky['catch'] = function (f) {
	      return pinky.then(null, f);
	    };

	    pinky['complete'] = function (f) {
	      return pinky.then(f, f);
	    };

	    pinky.cancel = function () {
	      if (window[id]) {
	        cleanup();
	      }
	    };

	    return pinky;
	  });

	  if (options.delay > 0) {
	    setTimeout(function () {
	      promise.send();
	    }, options.delay);
	  } else {
	    promise.send();
	  }

	  return promise;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.solveUrl = solveUrl;
	exports.generateKey = generateKey;

	var _blueimpMd = __webpack_require__(13);

	var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

	var _jqueryParam = __webpack_require__(9);

	var _jqueryParam2 = _interopRequireDefault(_jqueryParam);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function solveUrl(url, data) {
	  var queryString = (0, _jqueryParam2.default)(data);
	  return url + (url.indexOf('?') >= 0 ? '&' : '?') + queryString;
	}

	function generateKey(method, url, data) {
	  data = data || {};

	  // sort by key
	  var sorted = Object.keys(data).sort().map(function (key) {
	    return key + '=' + data[key];
	  });
	  sorted = sorted.join('&');
	  var key = method + ':' + url + ':' + sorted;

	  // short key length
	  if (key.length > 32) {
	    key = (0, _blueimpMd2.default)(key);
	  }
	  return key;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/*
	 * JavaScript MD5 1.0.1
	 * https://github.com/blueimp/JavaScript-MD5
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 * 
	 * Based on
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	/*jslint bitwise: true */
	/*global unescape, define */

	(function ($) {
	    'use strict';

	    /*
	    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	    * to work around bugs in some JS interpreters.
	    */

	    function safe_add(x, y) {
	        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
	            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	        return msw << 16 | lsw & 0xFFFF;
	    }

	    /*
	    * Bitwise rotate a 32-bit number to the left.
	    */
	    function bit_rol(num, cnt) {
	        return num << cnt | num >>> 32 - cnt;
	    }

	    /*
	    * These functions implement the four basic operations the algorithm uses.
	    */
	    function md5_cmn(q, a, b, x, s, t) {
	        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	    }
	    function md5_ff(a, b, c, d, x, s, t) {
	        return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	    }
	    function md5_gg(a, b, c, d, x, s, t) {
	        return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	    }
	    function md5_hh(a, b, c, d, x, s, t) {
	        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	    }
	    function md5_ii(a, b, c, d, x, s, t) {
	        return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	    }

	    /*
	    * Calculate the MD5 of an array of little-endian words, and a bit length.
	    */
	    function binl_md5(x, len) {
	        /* append padding */
	        x[len >> 5] |= 0x80 << len % 32;
	        x[(len + 64 >>> 9 << 4) + 14] = len;

	        var i,
	            olda,
	            oldb,
	            oldc,
	            oldd,
	            a = 1732584193,
	            b = -271733879,
	            c = -1732584194,
	            d = 271733878;

	        for (i = 0; i < x.length; i += 16) {
	            olda = a;
	            oldb = b;
	            oldc = c;
	            oldd = d;

	            a = md5_ff(a, b, c, d, x[i], 7, -680876936);
	            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	            b = md5_gg(b, c, d, a, x[i], 20, -373897302);
	            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	            d = md5_hh(d, a, b, c, x[i], 11, -358537222);
	            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	            a = md5_ii(a, b, c, d, x[i], 6, -198630844);
	            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	            a = safe_add(a, olda);
	            b = safe_add(b, oldb);
	            c = safe_add(c, oldc);
	            d = safe_add(d, oldd);
	        }
	        return [a, b, c, d];
	    }

	    /*
	    * Convert an array of little-endian words to a string
	    */
	    function binl2rstr(input) {
	        var i,
	            output = '';
	        for (i = 0; i < input.length * 32; i += 8) {
	            output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
	        }
	        return output;
	    }

	    /*
	    * Convert a raw string to an array of little-endian words
	    * Characters >255 have their high-byte silently ignored.
	    */
	    function rstr2binl(input) {
	        var i,
	            output = [];
	        output[(input.length >> 2) - 1] = undefined;
	        for (i = 0; i < output.length; i += 1) {
	            output[i] = 0;
	        }
	        for (i = 0; i < input.length * 8; i += 8) {
	            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
	        }
	        return output;
	    }

	    /*
	    * Calculate the MD5 of a raw string
	    */
	    function rstr_md5(s) {
	        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
	    }

	    /*
	    * Calculate the HMAC-MD5, of a key and some data (raw strings)
	    */
	    function rstr_hmac_md5(key, data) {
	        var i,
	            bkey = rstr2binl(key),
	            ipad = [],
	            opad = [],
	            hash;
	        ipad[15] = opad[15] = undefined;
	        if (bkey.length > 16) {
	            bkey = binl_md5(bkey, key.length * 8);
	        }
	        for (i = 0; i < 16; i += 1) {
	            ipad[i] = bkey[i] ^ 0x36363636;
	            opad[i] = bkey[i] ^ 0x5C5C5C5C;
	        }
	        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
	        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
	    }

	    /*
	    * Convert a raw string to a hex string
	    */
	    function rstr2hex(input) {
	        var hex_tab = '0123456789abcdef',
	            output = '',
	            x,
	            i;
	        for (i = 0; i < input.length; i += 1) {
	            x = input.charCodeAt(i);
	            output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
	        }
	        return output;
	    }

	    /*
	    * Encode a string as utf-8
	    */
	    function str2rstr_utf8(input) {
	        return unescape(encodeURIComponent(input));
	    }

	    /*
	    * Take string arguments and return either raw or hex encoded strings
	    */
	    function raw_md5(s) {
	        return rstr_md5(str2rstr_utf8(s));
	    }
	    function hex_md5(s) {
	        return rstr2hex(raw_md5(s));
	    }
	    function raw_hmac_md5(k, d) {
	        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
	    }
	    function hex_hmac_md5(k, d) {
	        return rstr2hex(raw_hmac_md5(k, d));
	    }

	    function md5(string, key, raw) {
	        if (!key) {
	            if (!raw) {
	                return hex_md5(string);
	            }
	            return raw_md5(string);
	        }
	        if (!raw) {
	            return hex_hmac_md5(key, string);
	        }
	        return raw_hmac_md5(key, string);
	    }

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return md5;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        $.md5 = md5;
	    }
	})(undefined);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(12);

	describe('queryString', function () {

	  it('solveUrl', function () {
	    (0, _util.solveUrl)('test.html', { b: 2 }).should.eql('test.html?b=2');
	    (0, _util.solveUrl)('test.html?a=1', { b: 2 }).should.eql('test.html?a=1&b=2');
	    (0, _util.solveUrl)('test.html?a=1&c=2', { b: 2 }).should.eql('test.html?a=1&c=2&b=2');
	    (0, _util.solveUrl)('test.html', { b: 'c&2' }).should.eql('test.html?b=c%262');
	  });

	  it('generateKey', function () {
	    var key = (0, _util.generateKey)('get', 'test.html', { a: 1 });
	    key.should.eql('get:test.html:a=1');

	    key = (0, _util.generateKey)('get', 'test.html', { b: 2, a: 1 });
	    key.should.eql('get:test.html:a=1&b=2');

	    key = (0, _util.generateKey)('get', 'http://www.example.com/very_lang_url.htl', { very: 1, long: 2, url: 3 });
	    key.should.eql('d541b8fd9da758ee68be9fd8d6817fe1');

	    key = (0, _util.generateKey)('get', 'http://www.example.com/very_lang_url.htl', { very: 1, long: 2, url: 4 });
	    key.should.eql('8d1dedd1e40b21b232e087e1e57f1876');
	  });
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cache = __webpack_require__(16);

	describe('cache', function () {

	  it('get null', function () {
	    ((0, _cache.getCache)('none') === null).should.be.true;
	  });

	  it('get data', function (done) {
	    (0, _cache.setCache)('test', { a: 1 });

	    (0, _cache.getCache)('test').then(function (res) {
	      res.should.eql({ a: 1 });
	      return res;
	    }).complete(function (res) {
	      res.should.eql({ a: 1 });
	      done();
	    });
	  });

	  it('over time', function (done) {
	    (0, _cache.setCache)('test', { a: 1 }, 0.5);

	    setTimeout(function () {
	      ((0, _cache.getCache)('test') === null).should.be.true;
	      done();
	    }, 600);
	  });
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCache = getCache;
	exports.setCache = setCache;

	var _pinkyswear = __webpack_require__(5);

	var _pinkyswear2 = _interopRequireDefault(_pinkyswear);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var STORAGE_KEY = '517abb684366799b';
	var storage = window && window.localStorage ? window.localStorage : null;

	var CACHE = {};

	if (storage) {
	  var item = storage.getItem(STORAGE_KEY);
	  if (item) {
	    try {
	      CACHE = JSON.parse(item) || {};
	      clean();
	    } catch (e) {
	      console.warn(e);
	    }
	  }
	}

	function getCache(key) {
	  var data = CACHE[key];
	  if (!data) {
	    return null;
	  }

	  if (data.expire < new Date().getTime()) {
	    setCache(key, null);
	    return null;
	  }

	  var promise = (0, _pinkyswear2.default)(function (pinky) {
	    pinky.send = function () {
	      promise(true, [data.data]);
	    };

	    pinky.complete = function (f) {
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

	function setCache(key, data) {
	  var expire = arguments.length <= 2 || arguments[2] === undefined ? 3600 : arguments[2];

	  if (data === null) {
	    delete CACHE[key];
	  } else {
	    expire *= 1000;
	    CACHE[key] = {
	      data: data,
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
	  var expire = new Date().getTime();
	  Object.keys(CACHE).forEach(function (key) {
	    if (expire > (CACHE[key].expire || 0)) {
	      delete CACHE[key];
	    }
	  });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _src = __webpack_require__(18);

	var _src2 = _interopRequireDefault(_src);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('fetch', function () {

	  it('get', function (done) {
	    _src2.default.get('/').then(function (res) {
	      res.should.eql('hello world');
	      done();
	    });
	  });

	  it('get cache delay', function (done) {
	    var tm = undefined;
	    _src2.default.get('/cache', null, { cache: 0.1, responseType: 'json' }).then(function (res) {
	      tm = res.time;
	    }).then(function () {
	      _src2.default.get('/cache', null, { cache: 500 }).then(function (res) {
	        res.time.should.eql(tm);
	      });
	    }).then(function () {
	      _src2.default.get('/cache', null, { cache: 0, delay: 500 }).then(function (res) {
	        (res.time - tm > 300).should.be.true;
	        done();
	      });
	      _src2.default.get('/cache', null, { cache: 0, delay: 100 }).then(function (res) {
	        res.time.should.not.eql(tm);
	        tm = res.time;
	      });
	    });
	  });

	  it('jsonp cache delay', function (done) {
	    var tm = undefined;
	    _src2.default.jsonp('/jsonp-delay', null, { cache: 0.1 }).then(function (res) {
	      tm = res.time;
	    }).then(function () {
	      _src2.default.jsonp('/jsonp-delay', null, { cache: 500 }).then(function (res) {
	        res.time.should.eql(tm);
	      });
	    }).then(function () {
	      _src2.default.jsonp('/jsonp-delay', null, { cache: 0, delay: 500 }).then(function (res) {
	        (res.time - tm > 300).should.be.true;
	        done();
	      });
	      _src2.default.jsonp('/jsonp-delay', null, { cache: 0, delay: 100 }).then(function (res) {
	        res.time.should.not.eql(tm);
	        tm = res.time;
	      });
	    });
	  });

	  it('custom peer success', function (done) {
	    _src2.default.setPeer(function (promise) {
	      return promise.then(function (res) {
	        if (res.success) {
	          return true;
	        } else {
	          return new Error(res.msg);
	        }
	      }).catch(function (res) {
	        res.message.should.eql('timeout');
	        done();
	      });
	    });

	    _src2.default.jsonp('/jsonp-data', { q: 1234 }).then(function (res) {
	      res.message.should.eql("expect q === '123'");
	    }).then(function () {
	      return _src2.default.jsonp('/jsonp-data', { q: 123 });
	    }).then(function (res) {
	      res.should.be.true;
	      return _src2.default.jsonp('/404', null, { timeout: 50 });
	    });
	  });
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ajax = __webpack_require__(3);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _jsonp = __webpack_require__(11);

	var _jsonp2 = _interopRequireDefault(_jsonp);

	var _util = __webpack_require__(12);

	var _cache = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var peer = null;

	function fetch(method, url, data, options) {
	  options = options || {};
	  var key = (0, _util.generateKey)(method, url, data);
	  var cache = options.cache;
	  var promise = undefined;
	  if (cache > 0) {
	    promise = (0, _cache.getCache)(key);
	    if (promise !== null) {
	      return promise;
	    }
	  }
	  if (method === 'jsonp') {
	    promise = (0, _jsonp2.default)(url, data, options);
	  } else {
	    promise = (0, _ajax2.default)(method, url, data, options);
	  }

	  if (typeof peer === 'function') {
	    promise = peer(promise);
	  }

	  if (cache > 0) {
	    promise.then(function (res) {
	      if (!(res instanceof Error)) {
	        (0, _cache.setCache)(key, res, cache);
	      }
	      return res;
	    });
	  }

	  return promise;
	}

	module.exports = {
	  get: function get(url, data, options) {
	    return fetch('get', url, data, options);
	  },

	  post: function post(url, data, options) {
	    return fetch('post', url, data, options);
	  },

	  put: function put(url, data, options) {
	    return fetch('put', url, data, options);
	  },

	  'delete': function _delete(url, data, options) {
	    return fetch('delete', url, data, options);
	  },

	  jsonp: function jsonp(url, data, options) {
	    return fetch('jsonp', url, data, options);
	  },

	  setPeer: function setPeer(fn) {
	    peer = fn;
	    return this;
	  }
	};

/***/ }
/******/ ]);