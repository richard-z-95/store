! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Store", [], t) : "object" == typeof exports ? exports.Store = t() : e.Store = t()
}(window, function () {
  return function (e) {
    var t = {};

    function r(n) {
      if (t[n]) return t[n].exports;
      var o = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      })
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var o in e) r.d(n, o, function (t) {
          return e[t]
        }.bind(null, o));
      return n
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return r.d(t, "a", t), t
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 1)
  }([function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.errorMapping = {
      LOCALSTOREAGE_NOT_SUPPORTED: "localStorage not supported",
      INVALID_PARAMETERS: "invalid parameters",
      UPDATE_TYPE_MISMATCH: "parameters type mismatch",
      KEY_NOT_EXISTED: "key does not existed"
    }
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, o = function () {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
          }
        }
        return function (t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t
        }
      }(),
      i = r(2),
      u = r(0),
      a = r(3),
      c = (n = a) && n.__esModule ? n : {
        default: n
      };
    var f = function () {
      function e() {
        ! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, e);
        var t = window.localStorage;
        if (!t) throw new Error(u.errorMapping.LOCALSTOREAGE_NOT_SUPPORTED);
        this.store = t
      }
      return o(e, [{
        key: "set",
        value: function (e, t) {
          var r = this.store,
            n = this._serialize;
          if (!e) throw new Error(u.errorMapping.INVALID_PARAMETERS);
          try {
            r.setItem(e, n(t))
          } catch (e) {
            return !1
          }
          return !0
        }
      }, {
        key: "get",
        value: function (e) {
          var t = this.store;
          return (0, this._deserialize)(t.getItem(e))
        }
      }, {
        key: "exist",
        value: function (e) {
          return this.store[e]
        }
      }, {
        key: "update",
        value: function (e, t) {
          var r = this.get,
            n = this.set,
            o = this.exist,
            a = this._update,
            f = n.bind(this),
            s = r.bind(this),
            l = o.bind(this),
            p = a.bind(this),
            y = l(e),
            d = s(e);
          if (y) {
            var b = !1;
            if (Array.isArray(d)) b = p(e, d.concat(t));
            else if ((0, i.isObject)(d)) {
              if (!(0, i.isObject)(t)) throw new Error(u.errorMapping.UPDATE_TYPE_MISMATCH);
              (0, c.default)(d, t), b = p(e, d)
            } else if ("boolean" == typeof d) {
              if ("boolean" != typeof t) throw new Error(u.errorMapping.UPDATE_TYPE_MISMATCH);
              b = p(e, t)
            } else b = p(e, d + t);
            return b
          }
          return f(e, t)
        }
      }, {
        key: "deleteItem",
        value: function (e) {
          var t = this.store;
          this.exist.bind(this)(e) && t.removeItem(e)
        }
      }, {
        key: "deleteBatch",
        value: function (e) {
          var t = this.deleteItem;
          this._each.bind(this)(e, t)
        }
      }, {
        key: "clearAll",
        value: function () {
          this.store.clear()
        }
      }, {
        key: "_update",
        value: function (e, t) {
          var r = this.set,
            n = this.exist,
            o = r.bind(this);
          if (n.bind(this)(e)) return o(e, t);
          throw new Error(u.errorMapping.KEY_NOT_EXISTED)
        }
      }, {
        key: "_each",
        value: function (e, t) {
          var r = t.bind(this);
          (0, i.each)(e, r)
        }
      }, {
        key: "_serialize",
        value: function (e) {
          return JSON.stringify(e)
        }
      }, {
        key: "_deserialize",
        value: function (e) {
          if (!e) return null;
          var t = null;
          try {
            t = JSON.parse(e)
          } catch (r) {
            t = e
          }
          return t
        }
      }]), e
    }();
    t.default = f
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.each = t.isFunction = t.isObject = void 0;
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      o = r(0),
      i = (t.isObject = function (e) {
        return null !== e && "object" === (void 0 === e ? "undefined" : n(e))
      }, t.isFunction = function (e) {
        return null !== e && "function" == typeof e
      });
    t.each = function (e, t) {
      if (!Array.isArray(e) || !i(t)) throw new Error(o.errorMapping.INVALID_PARAMETERS);
      e.forEach(function (e) {
        return t(e)
      })
    }
  }, function (e, t, r) {
    "use strict";
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    var n = Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
    e.exports = function () {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
        for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
        if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
            return t[e]
          }).join("")) return !1;
        var n = {};
        return "abcdefghijklmnopqrst".split("").forEach(function (e) {
          n[e] = e
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
      } catch (e) {
        return !1
      }
    }() ? Object.assign : function (e, t) {
      for (var r, u, a = function (e) {
          if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
          return Object(e)
        }(e), c = 1; c < arguments.length; c++) {
        for (var f in r = Object(arguments[c])) o.call(r, f) && (a[f] = r[f]);
        if (n) {
          u = n(r);
          for (var s = 0; s < u.length; s++) i.call(r, u[s]) && (a[u[s]] = r[u[s]])
        }
      }
      return a
    }
  }]).default
});