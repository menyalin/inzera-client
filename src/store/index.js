import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import router from '../router'

import api from '@/api'
import catalog from './catalogModule'
import prices from './priceModule'
import details from './detailModule'
import series from './seriesModule'

const initPlugin = store => {
  if (store.getters.token) {
    store.commit('setAppLoading', true)
    Promise.all([
      store.dispatch('getUserData'),
      store.dispatch('getCatalogGroups'),
      store.dispatch('getAllDetails')
    ])
      .catch(e => {})
      .finally(() => store.commit('setAppLoading', false))
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    loading: false,
    appLoading: false,
    error: null,
    baseUrl: process.env.VUE_APP_API_URL,
    currentDate: moment().format('YYYY-MM-DD')
  },
  mutations: {
    setAppLoading(state, payload) {
      state.appLoading = payload
    },
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
    },
    setToken(state, payload) {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    logOut(state) {
      localStorage.removeItem('token')
      state.token = null
      router.push('/auth/login')
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
    },
    signUp({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post('/auth/signUp', payload)
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    },
    getUserData({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/auth/user')
          .then(res => resolve(res))
          .catch(e => {
            if (e.response.status === 511) commit('logOut')
            reject(e)
          })
      })
    },
    signIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post('/auth/signIn', payload)
          .then(res => {
            commit('setToken', res.data.token)
            resolve(res)
          })
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    baseUrl: ({ baseUrl }) => baseUrl,
    error: ({ error }) => error,
    appLoading: ({ appLoading }) => appLoading,
    loading: ({ loading }) => loading,
    currentDate: ({ currentDate }) => currentDate,
    isLoggedIn: ({ token }) => !!token,
    token: ({ token }) => token
  },
  modules: {
    catalog,
    prices,
    details,
    series
  },
  plugins: [initPlugin]
})
