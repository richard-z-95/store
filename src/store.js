import { isObject, each } from './utils/index'
import { errorMapping } from './utils/error'
import objectAssign from 'object-assign'
export default class Store {
  constructor () {
    let localStorage = window.localStorage
    if (localStorage) {
      this.store = localStorage
    } else {
      throw new Error(errorMapping.LOCALSTOREAGE_NOT_SUPPORTED)
    }
  }
  set (k, v) {
    let { store, _serialize } = this
    if (!k) {
      throw new Error(errorMapping.INVALID_PARAMETERS)
    }
    try {
      store.setItem(k, _serialize(v))
    } catch (error) {
      return false
    }
    return true
  }
  get (k) {
    let { store, _deserialize } = this
    return _deserialize(store.getItem(k))
  }
  // 判断是否存在
  exist (k) {
    let { store } = this
    return store[k]
  }
  update (k, v) {
    let { get, set, exist, _update } = this
    let _set = set.bind(this)
    let _get = get.bind(this)
    let _exist = exist.bind(this)
    let doUpdate = _update.bind(this)
    // 实际存储在localStorage中的转化为字符串形式的值
    let oldValStr = _exist(k)
    // 获取转化后的旧值
    let oldVal = _get(k)
    // 需要根据实际存储在localStorage中的转化为字符串形式的值判断之前是否存储过
    if (oldValStr) {
      let success = false
      // 之前有值 则执行更新方法
      // 判断之前存储值的类型
      if (Array.isArray(oldVal)) {
        // 如果是数组 把新值添加进去
        success = doUpdate(k, oldVal.concat(v))
      } else if (isObject(oldVal)) {
        // 如果是对象 合并
        if (!isObject(v)) throw new Error(errorMapping.UPDATE_TYPE_MISMATCH)
        objectAssign(oldVal, v)
        success = doUpdate(k, oldVal)
      } else if (typeof oldVal === 'boolean') {
        // 如果是布尔类型的值 则替换掉旧值
        if (typeof v !== 'boolean') throw new Error(errorMapping.UPDATE_TYPE_MISMATCH)
        success = doUpdate(k, v)
      } else {
        // 如果是字符串 拼接
        success = doUpdate(k, oldVal + v)
      }
      return success
    } else {
      // 否则直接存储
      return _set(k, v)
    }
  }
  // 删除某个
  deleteItem (k) {
    let { store, exist } = this
    let _exist = exist.bind(this)
    if (_exist(k)) {
      store.removeItem(k)
    }
  }
  // 批量删除
  deleteBatch (list) {
    let { deleteItem, _each } = this
    let forEach = _each.bind(this)
    forEach(list, deleteItem)
  }
  // 全部删除
  clearAll () {
    let { store } = this
    store.clear()
  }
  // 更新
  _update (k, v) {
    let { set, exist } = this
    let _set = set.bind(this)
    let _exist = exist.bind(this)
    // exist(k)返回的是存储的字符串类型的值 不通过封装的get方法取 为了避免取出值为false的 导致抛出异常
    if (_exist(k)) {
      return _set(k, v)
    } else {
      throw new Error(errorMapping.KEY_NOT_EXISTED)
    }
  }
  _each (list, callback) {
    let _callback = callback.bind(this)
    each(list, _callback)
  }
  // 序列化
  _serialize (obj) {
    return JSON.stringify(obj)
  }
  // 反序列化
  _deserialize (strVal) {
    if (!strVal) return null
    let val = null
    try {
      val = JSON.parse(strVal)
    } catch (error) {
      val = strVal
    }
    return val
  }
}