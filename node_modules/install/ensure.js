// This file extends the core implementation of the makeInstaller function
// so that its require functions will support the require.ensure API.

var core = require("./install");
var Ap = Array.prototype;

exports.makeInstaller = function (options) {
  options = options || {};

  // Configurable function that should be used to schedule callbacks.
  var defer = options.defer || defaultDeferFunction;

  // Simple queue for tracking require.ensure callbacks that are waiting
  // for their dependencies to be installed and ready.
  var queue = {};
  queue.head = queue.tail = {};

  function queueAppend(payload) {
    queue.tail = queue.tail.next = payload;
    if (queue.head.next === queue.tail) {
      // If the queue contains only one payload (the one we just appended)
      // then go ahead and schedule a flush.
      queueFlush();
    }
  }

  var flushPending = false;
  function queueFlush() {
    if (flushPending) return;
    flushPending = true;

    defer(function () {
      flushPending = false;

      var next = queue.head.next;
      if (next && next.deps.every(next.require.ready)) {
        queueFlush();
        queue.head = next;
        next.callback.call(null, next.require);
      }
    });
  }

  // Whenever new modules are installed, try flushing the queue.
  var prevOnInstall = options.onInstall;
  options.onInstall = prevOnInstall ? function () {
    queueFlush();
    // Just in case options.onInstall was already defined, make sure we
    // continue to call it in addition to calling queueFlush.
    return prevOnInstall.apply(this, arguments);
  } : queueFlush;

  // Every `require` function created by the installer will be given an
  // `.ensure` property whose value is the function you see below, bound
  // so that its `this` object will always be the `require` function.
  options.requireMethods = options.requireMethods || {};
  options.requireMethods.ensure = function (deps, callback) {
    var require = this;
    var flatArgs = Ap.concat.apply(Ap, arguments);

    // Though the parameters above encourage passing an array of module
    // identifiers followed by a callback function, a la Webpack, you can
    // actually pass any combination of strings and functions, wrapped
    // with arrays or unwrapped, and the require.ensure function will
    // behave exactly the same.
    deps = [];
    callback = null;

    flatArgs.forEach(function (arg) {
      if (typeof arg === "string") {
        deps.push(arg);
      } else if (typeof arg === "function") {
        callback = arg;
      }
    });

    queueAppend({
      // The require function object to which this ensure method was
      // bound. In addition to require.ensure, we also rely on a method
      // called require.ready.
      require: require,

      // An array of (possibly relative) module identifiers that must be
      // installed and ready before we can call the callback.
      deps: deps,

      // If no callback function was found in the flattened arguments to
      // require.ensure, provide a default function that simply requires
      // each dependency (really common case).
      callback: callback || function () {
        deps.forEach(function (dep) {
          require.ensure(function () {
            require(dep);
          });
        });
      }
    });
  };

  return core.makeInstaller(options);
};

function defaultDeferFunction(callback) {
  setTimeout(callback, 0);
}
