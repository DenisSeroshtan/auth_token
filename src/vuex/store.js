import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA  (state, userData) {
      state.user = userData

      if (userData !== null) {
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      } else {
        localStorage.removeItem('user')
        axios.defaults.headers.common['Authorization'] = null
      }
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log('user data is', data)
          commit('SET_USER_DATA', data)
        })
    },

    async login ({ commit }, credentials) {
      const { data } = await axios.post('//localhost:3000/login', credentials)
      commit('SET_USER_DATA', data)
    },

    logout ({ commit }) {
      commit('SET_USER_DATA', null)
      location.reload()
    }
  }
})
