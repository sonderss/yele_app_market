class MinRequest {
  constructor () {
    this._config = {
      baseURL: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      timeOut: 5000
    }

    this.interceptors = {
      request: (func) => {
        if (func) {
          MinRequest._requestBefore = func
        } else {
          MinRequest._requestBefore = (request) => request
        }
      },
      response: (func) => {
        if (func) {
          MinRequest._requestAfter = func
        } else {
          MinRequest._requestAfter = (response) => response
        }
      }
    }
  }

  setConfig (func) {
    this._config = func(this._config)
  }

  static isCompleteURL (url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  static _requestBefore (config) {
    return config
  }

  static _requestAfter (response) {
    return response
  }

  _request (options = {}) {
    let obj = {}; let requestTask, timer
    obj.baseURL = options.baseURL || this._config.baseURL
    obj.dataType = options.dataType || this._config.dataType
    obj.url = MinRequest.isCompleteURL(options.url) ? options.url : (obj.baseURL + options.url)
    obj.data = options.data
    obj.header = { ...this._config.header, ...options.header }
    obj.method = options.method || this._config.method
    obj.timeOut = options.timeOut || this._config.timeOut

    obj = { ...obj, ...MinRequest._requestBefore(obj) }
    return new Promise((resolve, reject) => {
      uni.showLoading({
        title: '加载中...'
      })
      uni.onNetworkStatusChange(res => {
        if (!res.isConnected) {
          console.log(res)
          uni.hideLoading()
          clearTimeout(timer)
          return resolve(MinRequest._requestAfter(res))
        }
      })
      obj.success = function (res) {
        uni.hideLoading()
        clearTimeout(timer)
        resolve(MinRequest._requestAfter(res))
      }
      obj.fail = function (err) {
        uni.hideLoading()
        clearTimeout(timer)
        reject(MinRequest._requestAfter(err))
      }
      requestTask = uni.request(obj)
      timer = setTimeout(() => {
        uni.hideLoading()
        reject(new Error('网络请求超时'))
        requestTask.abort()
      }, obj.timeOut)
    })
  }

  get (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    // 这里是设置请求所需的token
    return this._request(options)
  }

  post (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this._request(options)
  }
}

MinRequest.install = function (Vue) {
  Vue.mixin({
    beforeCreate: function () {
      if (this.$options.minRequest) {
        Vue._minRequest = this.$options.minRequest
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$minApi', {
    get: function () {
      return Vue._minRequest
    }
  })
}

export default MinRequest
