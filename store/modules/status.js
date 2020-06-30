export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1,
    url:"",
    id:'',
    dev:false
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
    }
  }
}
