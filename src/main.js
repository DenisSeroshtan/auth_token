import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const userStringToken = localStorage.getItem('user')
    if (userStringToken) {
      const userTokenData = JSON.parse(userStringToken)
      this.$store.commit('SET_USER_DATA', userTokenData)
    }

    // guard fake token 
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return new Promise(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
