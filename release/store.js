'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _error = require('./error');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    var localStorage = window.localStorage;
    if (localStorage) {
      this.store = localStorage;
    } else {
      throw new Error(_error.errorMapping.LOCALSTOREAGE_NOT_SUPPORTED);
    }
  }

  _createClass(Store, [{
    key: 'set',
    value: function set(k, v) {
      var store = this.store,
          _serialize = this._serialize;

      if (!k) {
        throw new Error(_error.errorMapping.INVALID_PARAMETERS);
      }
      store.setItem(k, _serialize(v));
    }
  }, {
    key: 'get',
    value: function get(k) {
      var store = this.store,
          _deserialize = this._deserialize;

      return _deserialize(store.getItem(k));
    }
    // 判断是否存在

  }, {
    key: 'exist',
    value: function exist(k) {
      var store = this.store;

      return store[k];
    }
  }, {
    key: 'update',
    value: function update(k, v) {
      var get = this.get,
          set = this.set,
          exist = this.exist,
          _update = this._update;

      var _set = set.bind(this);
      var _get = get.bind(this);
      var _exist = exist.bind(this);
      var doUpdate = _update.bind(this);
      // 实际存储在localStorage中的转化为字符串形式的值
      var oldValStr = _exist(k);
      // 获取转化后的旧值
      var oldVal = _get(k);
      // 需要根据实际存储在localStorage中的转化为字符串形式的值判断之前是否存储过
      if (oldValStr) {
        // 之前有值 则执行更新方法
        // 判断之前存储值的类型
        if (Array.isArray(oldVal)) {
          // 如果是数组 把新值添加进去
          doUpdate(k, oldVal.concat(v));
        } else if ((0, _util.isObject)(oldVal)) {
          // 如果是对象 合并
          if (!(0, _util.isObject)(v)) throw new Error(_error.errorMapping.UPDATE_TYPE_MISMATCH);
          (0, _objectAssign2.default)(oldVal, v);
          doUpdate(k, oldVal);
        } else if (typeof oldVal === 'boolean') {
          // 如果是布尔类型的值 则替换掉旧值
          if (typeof v !== 'boolean') throw new Error(_error.errorMapping.UPDATE_TYPE_MISMATCH);
          doUpdate(k, v);
        } else {
          // 如果是字符串 拼接
          doUpdate(k, oldVal + v);
        }
      } else {
        // 否则直接存储
        _set(k, v);
      }
    }
    // 删除某个

  }, {
    key: 'deleteItem',
    value: function deleteItem(k) {
      var store = this.store,
          exist = this.exist;

      var _exist = exist.bind(this);
      if (_exist(k)) {
        store.removeItem(k);
      }
    }
    // 批量删除

  }, {
    key: 'deleteBatch',
    value: function deleteBatch(list) {
      var deleteItem = this.deleteItem,
          _each = this._each;

      var forEach = _each.bind(this);
      forEach(list, deleteItem);
    }
    // 全部删除

  }, {
    key: 'clearAll',
    value: function clearAll() {
      var store = this.store;

      store.clear();
    }
    // 更新

  }, {
    key: '_update',
    value: function _update(k, v) {
      var set = this.set,
          exist = this.exist;

      var _set = set.bind(this);
      var _exist = exist.bind(this);
      // exist(k)返回的是存储的字符串类型的值 不通过封装的get方法取 为了避免取出值为false的 导致抛出异常
      if (_exist(k)) {
        _set(k, v);
      } else {
        throw new Error(_error.errorMapping.KEY_NOT_EXISTED);
      }
    }
  }, {
    key: '_each',
    value: function _each(list, callback) {
      var _callback = callback.bind(this);
      (0, _util.each)(list, _callback);
    }
    // 序列化

  }, {
    key: '_serialize',
    value: function _serialize(obj) {
      return JSON.stringify(obj);
    }
    // 反序列化

  }, {
    key: '_deserialize',
    value: function _deserialize(strVal) {
      if (!strVal) return null;
      var val = null;
      try {
        val = JSON.parse(strVal);
      } catch (error) {
        val = null;
      }
      return val;
    }
  }]);

  return Store;
}();

exports.default = Store;