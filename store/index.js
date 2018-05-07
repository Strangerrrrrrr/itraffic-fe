import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

require('whatwg-fetch')

const store = () => new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    user_id: '',
    tempInfo: '',
    valine: false,
  },
  getters: {
    getStorage: function (state) {
      if (!state.access_token) {
        state.access_token = localStorage.getItem('access_token')
        state.username = localStorage.getItem('username')
        state.user_id = localStorage.getItem('user_id')
      }
      return state.access_token
    }
  },
  mutations: {
    SET_USERNAME: function (state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    SET_USER_ID: function (state, user_id) {
      state.user_id = user_id
      localStorage.setItem('user_id', user_id)
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