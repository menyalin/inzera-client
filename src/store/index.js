import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import api from '@/api'
import catalog from './catalogModule'
import prices from './priceModule'
import details from './detailModule'
import series from './seriesModule'

const initPlugin = store => {
  store.dispatch('initStore')
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    appLoading: false,
    error: null,
    baseUrl: process.env.VUE_APP_API_URL,
    currentDate: moment().format('YYYY-MM-DD')
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setCurrentDate(state, payload) {
      state.currentDate = payload
    }
  },
  actions: {
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
    }
  },
  getters: {
    baseUrl: ({ baseUrl }) => baseUrl,
    error: ({ error }) => error,
    appLoading: ({ appLoading }) => appLoading,
    loading: ({ loading }) => loading,
    currentDate: ({ currentDate }) => currentDate
  },
  modules: {
    catalog,
    prices,
    details,
    series
  },
  plugins: [initPlugin]
})
