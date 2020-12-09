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
    getCatalog(store, payload) {
      return new Promise((resolve, reject) => {
        api
          .get('/catalog')
          .then(response => {
            resolve(response.data)
          })
          .catch(e => reject(e))
      })
    },
    getImageUrls(store, payload) {
      return new Promise((resolve, reject) => {
        api
          .get('/catalog/images', {
            params: {
              folder: payload
            }
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    baseUrl: () => 'http://localhost:3000/api/'
  },
  modules: {}
})
