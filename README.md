# web-storage-json
![](https://img.shields.io/npm/dm/web-storage-json.svg?style=flat?branch=master) ![](https://img.shields.io/npm/v/web-storage-json.svg?style=flat) ![](https://img.shields.io/npm/l/web-storage-json.svg?style=flat?branch=master)
## Introduction
  formatted JSON based on localStorage

## Installation
```javascript
npm i web-storage-json
```

## Usage
### create instance
``` javascript
import 'Store' from 'web-storage-json'
const store = new Store()
```
### store.set & store.get
``` javascript
// set foo as a string
store.set('foo', '123')
store.get('foo') // "123"

// set foo as a number
store.get('foo', 123)
store.get('foo') // 123
```
### store.update
``` javascript
// method 'update' equals method 'set'
// if you have not set 'foo' before
store.update('foo', '123')
store.get('foo') // "123"

// set foo as array
store.set('foo', [1, 2, 3])
// method 'update' will concat new value and old value
// when old value is array
store.update('foo', [4, 5, 6])
store.get('foo') // [1, 2, 3, 4, 5, 6]
// obviously, you can call method 'set' directly to rewrite value
store.set('foo', [4, 5, 6])
store.get('foo') // [4, 5, 6]

// set foo as object
store.set('foo', {name: 'foo'})
// method 'update' will merge new value and old value 
// when old value is object and new value will overwrite duplicated key in old value
store.update('foo', {name: 'bar', age: 20})
store.get('foo') // {name: "bar", age: 20}
// throw type mismatch error when old value is object and new value is not object
store.update('foo', '123')

// set foo as boolean
store.set('foo', true)
// method 'update' will rewrite old value when old value is boolean
// only if new value is also boolean
store.update('foo', false)
store.get('foo') // false
// otherwise it will throw type mismatch error
store.update('foo', 123)

// set foo as string
store.set('foo', 'foo')
// method 'update' will join old value and new value
// when old value is string
store.update('foo', ' bar')
store.get('foo') // "foo bar"
```
### store.deleteItem
```javascript
store.deleteItem('foo')
```
### store.deleteBatch
```javascript
store.deleteBatch(['foo', 'bar'])
```
### store.clearAll
```javascript
store.clearAll()
```