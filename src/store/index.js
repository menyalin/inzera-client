import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading({ loading }, payload) {
      loading = payload
    },
    setError({ error }, payload) {
      error = payload
    },
    clearError({ error }) {
      error = null
    }
  },
  actions: {
    getCatalog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .get('/catalog')
          .then(response => {
            resolve(response.data)
          })
          .catch(e => reject(e))
      })
    }
  },
  modules: {}
})
