/**
 * There's a whole war about desicions who is responsible for doing what;
 * For the following framework easier to put control and responsibilities
 * on a top-level object, i.e. Application.
 */

// all framework classes are defined in this single file for simplicity

// jquery needed for a Deferred object.
define(['jquery'], function ($) {
  var framework = {};

  var mix = function (a,b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
  };

  /**
   * Create simple chain of event handlers
   * @example: attachHandler(window, 'onhashchange', handlerFunction)
   * @return nothing
   */
  var attachHandler = window.attachHandler = function (object, event, handler) {
    var saved = null;
    if (typeof object[event] === 'function') {
      saved = object[event];
    }

    object[event] = function () {
      if (saved) {
        saved.apply(null,arguments);
      }
      handler.apply(null,arguments);
    };
  };


  /**
   * Application controller
   */
  var Application = framework.Application = function () {
    var that = this;
    this.routes = [];

    this.hashChanged = function () {
      var hash = window.location.hash;
      var processed = false;
      that.routes.forEach(function (route) {
        var m = hash.match(route.matcher);
        if (m) {
          route.fn.apply(route.context, m.splice(1));
          processed = true;
        }
      });
      return processed;
    };

    attachHandler(window, 'onhashchange', this.hashChanged);
  };

  Application.prototype.navigate = function (hash) {
    window.location.hash = hash;
  };

  Application.prototype.addRoute = function (matcher, context, fn) {
    this.routes.push({
      context: context,
      matcher: matcher,
      fn: fn
    });
  };

  Application.prototype.attachView = Application.prototype.refreshView = function (selector, view) {
    var node = document.getElementById(selector);

    if (node) {
      node.innerHTML = view.render();
      view.node = node;
    }

    if (typeof view.afterRender === 'function') {
      view.afterRender();
    }
  };

  /**
   * Events handler/emitter mixin
   */
  var Evts = framework.Evts = {
    events: {},
    on: function (eventName, fn) {
      if ( ! this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(fn);
    },
    trigger: function (eventName) {
      var args = Array.prototype.splice.call(arguments, 1);
      var fns = this.events[eventName];

      if (fns && typeof fns.forEach === 'function') {
        fns.forEach(function (fn) {
          if (typeof fn === 'function') {
            fn.apply(null, args);
          }
        });
      }
    },
  };

  /**
   * Simplistic view
   *
   * builds an HTML text; view updates by recreating and reinserting the HTML.
   * remark: in real life a view should create and maintain documentFragment object
   * for an accurate manipulation of its elements
   */
  var View = framework.View = function (opts) {
    mix(this, opts);
    mix(this, Evts);
  };

  /**
   * Returns rendered HTML code that might be inserted to DOM by App Controller.
   * @return {[type]} [description]
   */
  View.prototype.render = function () {
    console.info('>> View.render abstract');
    return '';
  };


  /**
   * Cross between Collection and Model
   */
  var DataService = framework.DataService = function (opts) {
    this.models = [];
    this.url = '';
    this.cache = {};

    // these things are hardcoded here for simplicity.
    // in real app data will come from local backend and JSONP is not needed.
    this.proxy = [
      '',
      'http://jsonp.nodejitsu.com/?url=',
      // 'http://json2jsonp.com/?url=',
      // 'http://jsonpwrapper.com/?callback=callback&urls%5B%5D='
    ];

    // first proxy is just an empty string.
    this.useProxy = 0;

    mix(this, opts);
  };

  /**
   * Converts loaded JSON to usable array.
   * This one is a simple identity function. Likely to be rewritten in implementations.
   *
   * @param  whatever
   * @return array of objects
   */
  DataService.prototype.parse = function (data) {
    return data;
  };

  /**
   * Data loader. Uses predefined `url` property that might contain placeholders in `:id` format.
   *
   * @param  {hash} params  key-value pairs, key placeholder without ':'; value is, well, substitute value.
   * @return promise
   */
  DataService.prototype.load = function (params) {
    var that = this;
    params = params || {};

    // this is the end point:
    var url = this.proxy[this.useProxy] + this.url;

    var cacheKey = '';

    // expand placeholders as needed:
    for (var key in params) {
      url = url.replace(new RegExp(':'+key), params[key]);
      cacheKey += key + '-' + params[key] + ':';
    }

    // here is simple caching implemented. While it might be sufficient for most of the applications,
    // more robust solution is needed sometimes. Example: item listings might have a semi-dynamic
    // field, say, `quantity-left`. Here is layered caching should be used – on top of this current solution
    // request still be made, response analyzed and these `quantity-left` field values are injected into live page.
    var promise;

    if (this.cache[cacheKey]) {
      that.models = that.cache[cacheKey];
      promise = $.Deferred();
      setTimeout(function () {
        // data came from cache, simply resolve the promise:
        promise.resolve();
      });

    } else {
      // make the actual request, save data in `models` and in cache.
      promise = $.get(url, function(data){
        that.models = that.cache[cacheKey] = that.parse(data);
      });
    }

    return promise;
  };

  return framework;
});
