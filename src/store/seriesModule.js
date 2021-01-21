import api from '@/api'
const basePath = '/series'

export default {
  state: {
    allSeries: []
  },
  mutations: {
    setSeries(state, payload) {
      state.allSeries = payload
    },
    addSeries(state, payload) {
      state.allSeries.push(payload)
    },
    deleteSeries(state, id) {
      state.allSeries = state.allSeries.filter(item => item._id !== id)
    }
  },
  actions: {
    getAllSeries({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath)
          .then(({ data }) => {
            commit('setSeries', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    getSeriesById(_, id) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath + '/' + id)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    createSeries({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post(basePath, payload)
          .then(({ data }) => {
            commit('addSeries', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    updateSeries(_, { _id, name, sku }) {
      return new Promise((resolve, reject) => {
        api
          .put(basePath + '/' + _id, { name, sku })
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    },
    deleteSeries({ commit }, _id) {
      return new Promise((resolve, reject) => {
        api
          .delete(basePath + '/' + _id)
          .then(({ data }) => {
            commit('deleteSeries', _id)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    allSeries: ({ allSeries }) => allSeries
  }
}
