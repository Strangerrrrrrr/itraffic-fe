import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

require('whatwg-fetch')

const key = 'access_token'
const store = () => new Vuex.Store({
  state: {
    authUser: null,
    access_token: null
  },
  getters: {
    getStorage: function (state) {
      if (!state.access_token) {
        state.access_token = localStorage.getItem(key)
      }
      return state.access_token
    }
  },
  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    },
    SET_ACCESS_TOKEN (state, token) {
      state.access_token = token
      localStorage.setItem('access_token', token)
    },
  },
})

export default store