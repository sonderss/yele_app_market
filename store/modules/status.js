export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1,
    url:"",
    id:'',
    dev:false,
    payMethods:[],
    isGetUser:false,
    isReloadUserInfo:false,
    location:{longitude:'',latitude:''}
  },
  mutations: {
    setStatus: (state, data) => {
      state.intNet = data
    },
    setUrl: (state, data) => {
      state.url = data
    },
    setId: (state,data) => {
      state.id = data
    },
    setDev: (state,data) => {
      state.dev = data
    },
    setPayMethods: (state,data) => {
      state.payMethods = data
    },
    setisGetUser: (state,data) => {
      state.isGetUser = data
      console.log(state.isGetUser)
    },
    setisReloadUserInfo: (state, data) => {
      state.isReloadUserInfo = data
      console.log("改变头像",  state.isReloadUserInfo)
    },
    setLocation: (state,data) => {
      state.location = data
      console.log(state.location)
    }
  },
  actions: {
    setStatus ({ commit }, data) {
      commit('setStatus', data)
    },
    setUrl: ({ commit }, data) => {
      commit('setUrl', data)
    },
    setId: ({ commit }, data) => {
      commit('setId', data)
    },
    setDev ({ commit },data) {
      commit('setDev',data)
    },
    setPayMethods ({ commit }, data) {
      commit('setPayMethods',data)
    },
    setisGetUser ({ commit }, data) {
      commit('setisGetUser',data)
    },
    setisReloadUserInfo({ commit }, data) {
      commit('setisReloadUserInfo', data)
    },
    setLocation ({ commit }, data) {
      commit('setLocation',data)
    }
  }
}
