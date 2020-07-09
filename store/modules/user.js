export default {
  namespaced: true,
  cache: 'not',
  state: {
    userInfo: {},
    userInfos:{}
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    },
    setUserInfoAuth: (state,data) => {
      state.userInfo.apiAuth = data
      console.log(state.userInfo.apiAuth)
    },
    setUserInfos: (state,data) => {
      state.userInfos = data
    }
  },
  actions: {
    setUserInfo ({ commit }, data) {
      commit('setUserInfo', data)
    },
    setUserInfoAuth({ commit }, data) {
      commit('setUserInfoAuth',data)
    },
    setUserInfos ({ commit }, data) {
      commit('setUserInfos', data)
    }
  }
}
