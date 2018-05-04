import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

require('whatwg-fetch')

const key = 'access_token'
const store = () => new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    tempInfo: '',
    valine: false,
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
    SET_USERNAME: function (state, username) {
      state.username = username
    },
    SET_ACCESS_TOKEN (state, token) {
      state.access_token = token
      localStorage.setItem('access_token', token)
    },
    SET_TEMP_INFO (state, tempInfo) {
      state.tempInfo = tempInfo
    },
    SET_VALINE: function (state, valine) {
      state.valine = valine
    }
  },
})

export default store