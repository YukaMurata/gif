/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./gif.js/dist/gif.js":
/*!****************************!*\
  !*** ./gif.js/dist/gif.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n// gif.js 0.2.1 - https://github.com/jnordberg/gif.js\n(function (f) {\n  if (( false ? undefined : _typeof(exports)) === \"object\" && typeof module !== \"undefined\") {\n    module.exports = f();\n  } else if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var g; }\n})(function () {\n  var define, module, exports;return function e(t, n, r) {\n    function s(o, u) {\n      if (!n[o]) {\n        if (!t[o]) {\n          var a = typeof require == \"function\" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error(\"Cannot find module '\" + o + \"'\");throw f.code = \"MODULE_NOT_FOUND\", f;\n        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {\n          var n = t[o][1][e];return s(n ? n : e);\n        }, l, l.exports, e, t, n, r);\n      }return n[o].exports;\n    }var i = typeof require == \"function\" && require;for (var o = 0; o < r.length; o++) {\n      s(r[o]);\n    }return s;\n  }({ 1: [function (require, module, exports) {\n      function EventEmitter() {\n        this._events = this._events || {};this._maxListeners = this._maxListeners || undefined;\n      }module.exports = EventEmitter;EventEmitter.EventEmitter = EventEmitter;EventEmitter.prototype._events = undefined;EventEmitter.prototype._maxListeners = undefined;EventEmitter.defaultMaxListeners = 10;EventEmitter.prototype.setMaxListeners = function (n) {\n        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError(\"n must be a positive number\");this._maxListeners = n;return this;\n      };EventEmitter.prototype.emit = function (type) {\n        var er, handler, len, args, i, listeners;if (!this._events) this._events = {};if (type === \"error\") {\n          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {\n            er = arguments[1];if (er instanceof Error) {\n              throw er;\n            } else {\n              var err = new Error('Uncaught, unspecified \"error\" event. (' + er + \")\");err.context = er;throw err;\n            }\n          }\n        }handler = this._events[type];if (isUndefined(handler)) return false;if (isFunction(handler)) {\n          switch (arguments.length) {case 1:\n              handler.call(this);break;case 2:\n              handler.call(this, arguments[1]);break;case 3:\n              handler.call(this, arguments[1], arguments[2]);break;default:\n              args = Array.prototype.slice.call(arguments, 1);handler.apply(this, args);}\n        } else if (isObject(handler)) {\n          args = Array.prototype.slice.call(arguments, 1);listeners = handler.slice();len = listeners.length;for (i = 0; i < len; i++) {\n            listeners[i].apply(this, args);\n          }\n        }return true;\n      };EventEmitter.prototype.addListener = function (type, listener) {\n        var m;if (!isFunction(listener)) throw TypeError(\"listener must be a function\");if (!this._events) this._events = {};if (this._events.newListener) this.emit(\"newListener\", type, isFunction(listener.listener) ? listener.listener : listener);if (!this._events[type]) this._events[type] = listener;else if (isObject(this._events[type])) this._events[type].push(listener);else this._events[type] = [this._events[type], listener];if (isObject(this._events[type]) && !this._events[type].warned) {\n          if (!isUndefined(this._maxListeners)) {\n            m = this._maxListeners;\n          } else {\n            m = EventEmitter.defaultMaxListeners;\n          }if (m && m > 0 && this._events[type].length > m) {\n            this._events[type].warned = true;console.error(\"(node) warning: possible EventEmitter memory \" + \"leak detected. %d listeners added. \" + \"Use emitter.setMaxListeners() to increase limit.\", this._events[type].length);if (typeof console.trace === \"function\") {\n              console.trace();\n            }\n          }\n        }return this;\n      };EventEmitter.prototype.on = EventEmitter.prototype.addListener;EventEmitter.prototype.once = function (type, listener) {\n        if (!isFunction(listener)) throw TypeError(\"listener must be a function\");var fired = false;function g() {\n          this.removeListener(type, g);if (!fired) {\n            fired = true;listener.apply(this, arguments);\n          }\n        }g.listener = listener;this.on(type, g);return this;\n      };EventEmitter.prototype.removeListener = function (type, listener) {\n        var list, position, length, i;if (!isFunction(listener)) throw TypeError(\"listener must be a function\");if (!this._events || !this._events[type]) return this;list = this._events[type];length = list.length;position = -1;if (list === listener || isFunction(list.listener) && list.listener === listener) {\n          delete this._events[type];if (this._events.removeListener) this.emit(\"removeListener\", type, listener);\n        } else if (isObject(list)) {\n          for (i = length; i-- > 0;) {\n            if (list[i] === listener || list[i].listener && list[i].listener === listener) {\n              position = i;break;\n            }\n          }if (position < 0) return this;if (list.length === 1) {\n            list.length = 0;delete this._events[type];\n          } else {\n            list.splice(position, 1);\n          }if (this._events.removeListener) this.emit(\"removeListener\", type, listener);\n        }return this;\n      };EventEmitter.prototype.removeAllListeners = function (type) {\n        var key, listeners;if (!this._events) return this;if (!this._events.removeListener) {\n          if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];return this;\n        }if (arguments.length === 0) {\n          for (key in this._events) {\n            if (key === \"removeListener\") continue;this.removeAllListeners(key);\n          }this.removeAllListeners(\"removeListener\");this._events = {};return this;\n        }listeners = this._events[type];if (isFunction(listeners)) {\n          this.removeListener(type, listeners);\n        } else if (listeners) {\n          while (listeners.length) {\n            this.removeListener(type, listeners[listeners.length - 1]);\n          }\n        }delete this._events[type];return this;\n      };EventEmitter.prototype.listeners = function (type) {\n        var ret;if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();return ret;\n      };EventEmitter.prototype.listenerCount = function (type) {\n        if (this._events) {\n          var evlistener = this._events[type];if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;\n        }return 0;\n      };EventEmitter.listenerCount = function (emitter, type) {\n        return emitter.listenerCount(type);\n      };function isFunction(arg) {\n        return typeof arg === \"function\";\n      }function isNumber(arg) {\n        return typeof arg === \"number\";\n      }function isObject(arg) {\n        return (typeof arg === \"undefined\" ? \"undefined\" : _typeof(arg)) === \"object\" && arg !== null;\n      }function isUndefined(arg) {\n        return arg === void 0;\n      }\n    }, {}], 2: [function (require, module, exports) {\n      var UA, browser, mode, platform, ua;ua = navigator.userAgent.toLowerCase();platform = navigator.platform.toLowerCase();UA = ua.match(/(opera|ie|firefox|chrome|version)[\\s\\/:]([\\w\\d\\.]+)?.*?(safari|version[\\s\\/:]([\\w\\d\\.]+)|$)/) || [null, \"unknown\", 0];mode = UA[1] === \"ie\" && document.documentMode;browser = { name: UA[1] === \"version\" ? UA[3] : UA[1], version: mode || parseFloat(UA[1] === \"opera\" && UA[4] ? UA[4] : UA[2]), platform: { name: ua.match(/ip(?:ad|od|hone)/) ? \"ios\" : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || [\"other\"])[0] } };browser[browser.name] = true;browser[browser.name + parseInt(browser.version, 10)] = true;browser.platform[browser.platform.name] = true;module.exports = browser;\n    }, {}], 3: [function (require, module, exports) {\n      var EventEmitter,\n          GIF,\n          browser,\n          extend = function extend(child, parent) {\n        for (var key in parent) {\n          if (hasProp.call(parent, key)) child[key] = parent[key];\n        }function ctor() {\n          this.constructor = child;\n        }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;\n      },\n          hasProp = {}.hasOwnProperty,\n          indexOf = [].indexOf || function (item) {\n        for (var i = 0, l = this.length; i < l; i++) {\n          if (i in this && this[i] === item) return i;\n        }return -1;\n      },\n          slice = [].slice;EventEmitter = require(\"events\").EventEmitter;browser = require(\"./browser.coffee\");GIF = function (superClass) {\n        var defaults, frameDefaults;extend(GIF, superClass);defaults = { workerScript: \"gif.worker.js\", workers: 2, repeat: 0, background: \"#fff\", quality: 10, width: null, height: null, transparent: null, debug: false, dither: false };frameDefaults = { delay: 500, copy: false, dispose: -1 };function GIF(options) {\n          var base, key, value;this.running = false;this.options = {};this.frames = [];this.freeWorkers = [];this.activeWorkers = [];this.setOptions(options);for (key in defaults) {\n            value = defaults[key];if ((base = this.options)[key] == null) {\n              base[key] = value;\n            }\n          }\n        }GIF.prototype.setOption = function (key, value) {\n          this.options[key] = value;if (this._canvas != null && (key === \"width\" || key === \"height\")) {\n            return this._canvas[key] = value;\n          }\n        };GIF.prototype.setOptions = function (options) {\n          var key, results, value;results = [];for (key in options) {\n            if (!hasProp.call(options, key)) continue;value = options[key];results.push(this.setOption(key, value));\n          }return results;\n        };GIF.prototype.addFrame = function (image, options) {\n          var frame, key;if (options == null) {\n            options = {};\n          }frame = {};frame.transparent = this.options.transparent;for (key in frameDefaults) {\n            frame[key] = options[key] || frameDefaults[key];\n          }if (this.options.width == null) {\n            this.setOption(\"width\", image.width);\n          }if (this.options.height == null) {\n            this.setOption(\"height\", image.height);\n          }if (typeof ImageData !== \"undefined\" && ImageData !== null && image instanceof ImageData) {\n            frame.data = image.data;\n          } else if (typeof CanvasRenderingContext2D !== \"undefined\" && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== \"undefined\" && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) {\n            if (options.copy) {\n              frame.data = this.getContextData(image);\n            } else {\n              frame.context = image;\n            }\n          } else if (image.childNodes != null) {\n            if (options.copy) {\n              frame.data = this.getImageData(image);\n            } else {\n              frame.image = image;\n            }\n          } else {\n            throw new Error(\"Invalid image\");\n          }return this.frames.push(frame);\n        };GIF.prototype.render = function () {\n          var i, j, numWorkers, ref;if (this.running) {\n            throw new Error(\"Already running\");\n          }if (this.options.width == null || this.options.height == null) {\n            throw new Error(\"Width and height must be set prior to rendering\");\n          }this.running = true;this.nextFrame = 0;this.finishedFrames = 0;this.imageParts = function () {\n            var j, ref, results;results = [];for (i = j = 0, ref = this.frames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {\n              results.push(null);\n            }return results;\n          }.call(this);numWorkers = this.spawnWorkers();if (this.options.globalPalette === true) {\n            this.renderNextFrame();\n          } else {\n            for (i = j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {\n              this.renderNextFrame();\n            }\n          }this.emit(\"start\");return this.emit(\"progress\", 0);\n        };GIF.prototype.abort = function () {\n          var worker;while (true) {\n            worker = this.activeWorkers.shift();if (worker == null) {\n              break;\n            }this.log(\"killing active worker\");worker.terminate();\n          }this.running = false;return this.emit(\"abort\");\n        };GIF.prototype.spawnWorkers = function () {\n          var j, numWorkers, ref, results;numWorkers = Math.min(this.options.workers, this.frames.length);(function () {\n            results = [];for (var j = ref = this.freeWorkers.length; ref <= numWorkers ? j < numWorkers : j > numWorkers; ref <= numWorkers ? j++ : j--) {\n              results.push(j);\n            }return results;\n          }).apply(this).forEach(function (_this) {\n            return function (i) {\n              var worker;_this.log(\"spawning worker \" + i);worker = new Worker(_this.options.workerScript);worker.onmessage = function (event) {\n                _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1);_this.freeWorkers.push(worker);return _this.frameFinished(event.data);\n              };return _this.freeWorkers.push(worker);\n            };\n          }(this));return numWorkers;\n        };GIF.prototype.frameFinished = function (frame) {\n          var i, j, ref;this.log(\"frame \" + frame.index + \" finished - \" + this.activeWorkers.length + \" active\");this.finishedFrames++;this.emit(\"progress\", this.finishedFrames / this.frames.length);this.imageParts[frame.index] = frame;if (this.options.globalPalette === true) {\n            this.options.globalPalette = frame.globalPalette;this.log(\"global palette analyzed\");if (this.frames.length > 2) {\n              for (i = j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {\n                this.renderNextFrame();\n              }\n            }\n          }if (indexOf.call(this.imageParts, null) >= 0) {\n            return this.renderNextFrame();\n          } else {\n            return this.finishRendering();\n          }\n        };GIF.prototype.finishRendering = function () {\n          var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;len = 0;ref = this.imageParts;for (j = 0, len1 = ref.length; j < len1; j++) {\n            frame = ref[j];len += (frame.data.length - 1) * frame.pageSize + frame.cursor;\n          }len += frame.pageSize - frame.cursor;this.log(\"rendering finished - filesize \" + Math.round(len / 1e3) + \"kb\");data = new Uint8Array(len);offset = 0;ref1 = this.imageParts;for (k = 0, len2 = ref1.length; k < len2; k++) {\n            frame = ref1[k];ref2 = frame.data;for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {\n              page = ref2[i];data.set(page, offset);if (i === frame.data.length - 1) {\n                offset += frame.cursor;\n              } else {\n                offset += frame.pageSize;\n              }\n            }\n          }image = new Blob([data], { type: \"image/gif\" });return this.emit(\"finished\", image, data);\n        };GIF.prototype.renderNextFrame = function () {\n          var frame, task, worker;if (this.freeWorkers.length === 0) {\n            throw new Error(\"No free workers\");\n          }if (this.nextFrame >= this.frames.length) {\n            return;\n          }frame = this.frames[this.nextFrame++];worker = this.freeWorkers.shift();task = this.getTask(frame);this.log(\"starting frame \" + (task.index + 1) + \" of \" + this.frames.length);this.activeWorkers.push(worker);return worker.postMessage(task);\n        };GIF.prototype.getContextData = function (ctx) {\n          return ctx.getImageData(0, 0, this.options.width, this.options.height).data;\n        };GIF.prototype.getImageData = function (image) {\n          var ctx;if (this._canvas == null) {\n            this._canvas = document.createElement(\"canvas\");this._canvas.width = this.options.width;this._canvas.height = this.options.height;\n          }ctx = this._canvas.getContext(\"2d\");ctx.fillStyle = this.options.background;ctx.fillRect(0, 0, this.options.width, this.options.height);ctx.drawImage(image, 0, 0);return this.getContextData(ctx);\n        };GIF.prototype.getTask = function (frame) {\n          var index, task;index = this.frames.indexOf(frame);task = { index: index, last: index === this.frames.length - 1, delay: frame.delay, dispose: frame.dispose, transparent: frame.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, dither: this.options.dither, globalPalette: this.options.globalPalette, repeat: this.options.repeat, canTransfer: browser.name === \"chrome\" };if (frame.data != null) {\n            task.data = frame.data;\n          } else if (frame.context != null) {\n            task.data = this.getContextData(frame.context);\n          } else if (frame.image != null) {\n            task.data = this.getImageData(frame.image);\n          } else {\n            throw new Error(\"Invalid frame\");\n          }return task;\n        };GIF.prototype.log = function () {\n          var args;args = 1 <= arguments.length ? slice.call(arguments, 0) : [];if (!this.options.debug) {\n            return;\n          }return console.log.apply(console, args);\n        };return GIF;\n      }(EventEmitter);module.exports = GIF;\n    }, { \"./browser.coffee\": 2, events: 1 }] }, {}, [3])(3);\n});\n//# sourceMappingURL=gif.js.map\n\n//# sourceURL=webpack:///./gif.js/dist/gif.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _gifCreate = __webpack_require__(/*! ./modules/gifCreate */ \"./js/modules/gifCreate.js\");\n\nvar _gifCreate2 = _interopRequireDefault(_gifCreate);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nnew _gifCreate2.default();\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/modules/gifCreate.js":
/*!*********************************!*\
  !*** ./js/modules/gifCreate.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _gif = __webpack_require__(/*! ../../gif.js/dist/gif */ \"./gif.js/dist/gif.js\");\n\nvar _gif2 = _interopRequireDefault(_gif);\n\nvar _events = __webpack_require__(/*! events */ \"./node_modules/node-libs-browser/node_modules/events/events.js\");\n\nvar _events2 = _interopRequireDefault(_events);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Gif = function (_EventEmitter) {\n  _inherits(Gif, _EventEmitter);\n\n  function Gif() {\n    _classCallCheck(this, Gif);\n\n    var _this = _possibleConstructorReturn(this, (Gif.__proto__ || Object.getPrototypeOf(Gif)).call(this));\n\n    _this.$input = document.querySelector('#myImage');\n    _this.$preview = document.getElementById('preview');\n    _this.newImage = document.querySelectorAll('#preview');\n    _this.image = document.querySelectorAll('img.input');\n    _this.canvas = document.querySelector('canvas');\n    _this.context = _this.canvas.getContext('2d');\n\n    _this.renderImg = document.querySelector('img.render');\n    _this.contentWidth = 500;\n    _this.contentHeight = 500;\n    _this.url = '';\n    _this.images = [];\n    _this.gifSrc = '';\n\n    _this.frame = new Array('images/frame0.png', 'images/frame1.png', 'images/frame2.png', 'images/frame3.png', 'images/frame4.png', 'images/frame5.png', 'images/frame6.png', 'images/frame7.png', 'images/frame8.png', 'images/frame9.png', 'images/frame10.png', 'images/frame11.png', 'images/frame12.png', 'images/frame13.png', 'images/frame14.png', 'images/frame15.png');\n    _this.newFrame = {};\n    _this.frameIndex = 0;\n\n    _this.gif = new _gif2.default({\n      debug: true, //consoleを出力するかどうか\n      workers: 2, //一度にスタートさせる量\n      repeat: 0, //gifをリピートさせるかどうか\n      workerScript: './js/gif.worker.js',\n      background: '#fff', //背景色\n      quality: 5, //クオリティ\n      width: 500,\n      height: 500\n    });\n\n    _this.addEvent();\n    return _this;\n  }\n\n  /**\n   * イベントまとめたもの\n   */\n\n\n  _createClass(Gif, [{\n    key: 'addEvent',\n    value: function addEvent() {\n      var _this2 = this;\n\n      this.$input.addEventListener('change', function (e) {\n        _this2.inputImage(e);\n      }, false);\n\n      this.on('inputImage', function () {\n        _this2.createImage();\n      });\n\n      this.on('createImages', function () {\n        _this2.downloadFrame();\n      });\n    }\n\n    //canvasに作ったgifをおく\n\n  }, {\n    key: 'createImage',\n    value: function createImage() {\n      var _this3 = this;\n\n      this.canvas.width = this.contentWidth;\n      this.canvas.height = this.contentHeight;\n      this.createImages.onload = function () {\n        console.log(_this3.createImages);\n        _this3.context.drawImage(_this3.createImages, 0, 0, 500, 500);\n        _this3.emit('createImages');\n      };\n    }\n\n    /**\n     * 画像をアップする\n     * @param {*} e\n     */\n\n  }, {\n    key: 'inputImage',\n    value: function inputImage(e) {\n      var _this4 = this;\n\n      if (e.target.files && e.target.files[0]) {\n        var reader = new FileReader();\n        this.createImages = new Image();\n        reader.onload = function (e) {\n          _this4.createImages.src = e.target.result;\n          _this4.emit('inputImage');\n        };\n        reader.readAsDataURL(e.target.files[0]);\n      }\n    }\n\n    /**\n     * 画像フレームのプリロード\n     */\n\n  }, {\n    key: 'downloadFrame',\n    value: function downloadFrame() {\n      var _this5 = this;\n\n      var frameLength = this.frame.length;\n      for (var i = 0; i < frameLength; i++) {\n        this.newFrame[i] = new Image();\n        this.newFrame[i].src = this.frame[i];\n        this.newFrame[i].onload = function () {\n          _this5.frameIndex++;\n          if (_this5.frameIndex === frameLength) {\n            _this5.createGif();\n          }\n        };\n      }\n    }\n\n    /**\n     * gifを作成する\n     */\n\n  }, {\n    key: 'createGif',\n    value: function createGif() {\n      var _this6 = this;\n\n      for (var i = 0; i < 16; i++) {\n        var width = 500 - 33 * i;\n        var centerPoint = 250 - width / 2;\n        var alpha = (10 - i * 0.6) / 10;\n        this.context.clearRect(0, 0, this.contentWidth, this.contentHeight);\n        this.context.drawImage(this.createImages, centerPoint, centerPoint, width, width);\n        this.context.drawImage(this.newFrame[i], 0, 0, 500, 500);\n        this.context.globalAlpha = alpha;\n        this.gif.addFrame(this.canvas, {\n          delay: 100,\n          copy: true\n        });\n      }\n\n      this.gif.on('finished', function (blob) {\n        _this6.renderImg.src = URL.createObjectURL(blob);\n        _this6.canvas.style = 'display:none';\n      });\n      this.gif.render();\n    }\n  }]);\n\n  return Gif;\n}(_events2.default);\n\nexports.default = Gif;\n\n//# sourceURL=webpack:///./js/modules/gifCreate.js?");

/***/ })

/******/ });