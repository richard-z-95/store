import { errorMapping } from './error'
export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object'
}
export const isFunction = (obj) => {
  return obj !== null && typeof obj === 'function'
}
export const each = (list, fn) => {
  if (Array.isArray(list) && isFunction(fn)) {
    list.forEach(item => fn(item))
  } else {
    throw new Error(errorMapping.INVALID_PARAMETERS)
  }
}
