'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = exports.isFunction = exports.isObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _error = require('./error');

var isObject = exports.isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};
var isFunction = exports.isFunction = function isFunction(obj) {
  return obj !== null && typeof obj === 'function';
};
var each = exports.each = function each(list, fn) {
  if (Array.isArray(list) && isFunction(fn)) {
    list.forEach(function (item) {
      return fn(item);
    });
  } else {
    throw new Error(_error.errorMapping.INVALID_PARAMETERS);
  }
};