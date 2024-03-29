const cacheMap = new Map()
let instance = null
let timeoutDefault = 300

function isTimeout (name) {
  const data = cacheMap.get(name)
  if (!data) return true
  if (data.timeout === 0) return false
  const currentTime = Date.now()
  const overTime = (currentTime - data.createTime) / 1000
  if (overTime > data.timeout) {
    cacheMap.delete(name)
    return true
  }
  return false
}

class CacheCell {
  constructor (data, timeout) {
    this.data = data
    this.timeout = timeout
    this.createTime = Date.now()
  }
}

class Cache {
  set (name, data, timeout = timeoutDefault) {
    const cachecell = new CacheCell(data, timeout)
    return cacheMap.set(name, cachecell)
  }

  get (name) {
    return isTimeout(name) ? null : cacheMap.get(name).data
  }

  delete (name) {
    return cacheMap.delete(name)
  }

  has (name) {
    return !isTimeout(name)
  }

  clear () {
    return cacheMap.clear()
  }

  setTimeoutDefault (num) {
    if (timeoutDefault === 300) {
      return (timeoutDefault = num)
    }
    throw Error('缓存器只能设置一次默认过期时间')
  }
}

class ProxyCache {
  constructor () {
    return instance || (instance = new Cache())
  }
}

ProxyCache.install = function (Vue) {
  Vue.prototype.$cache = new ProxyCache()
}

export default ProxyCache
