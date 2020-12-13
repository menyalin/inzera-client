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
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    getCatalog(store, payload) {
      return new Promise((resolve, reject) => {
        api
          .get('/catalog', {
            params: payload
          })
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
          .then(response => resolve(response.data))
          .catch(e => reject(e))
      })
    },
    newCatalogItem(store, payload) {
      return new Promise((resolve, reject) => {
        api
          .post('/catalog', payload)
          .then(response => resolve(response.data))
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    baseUrl: () => 'http://localhost:3000/api/',
    error: ({ error }) => error
  },
  modules: {}
})
