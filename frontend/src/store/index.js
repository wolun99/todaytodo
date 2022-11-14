import { createStore } from 'vuex'
import { LoginUser, setUserCookie, setTokenCookie, getUserCookie, getTokenCookie } from '@/api/index.js'

export default createStore({
  state: {
    user_id: getUserCookie() || '',
    token: getTokenCookie() || '',
    message: {}
  },
  getters: {
    isLogin(state) {
      return state.user_id !== ''
    },
    undefineLogin(state) {
      return state.user_id !== undefined
    }
  },
  mutations: {
    setUsername(state, data) {
      state.user_id = data
    },
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {
    async Login({ commit }, loginData) {
      const { data } = await LoginUser(loginData)
      if (data.message === '') {
        commit('setUsername', data.user_id)
        commit('setToken', data.token)
        setUserCookie(data.user_id)
        setTokenCookie(data.token)
      } else {
        alert(data.message)
      }
    }
  },
  modules: {
  }
})
