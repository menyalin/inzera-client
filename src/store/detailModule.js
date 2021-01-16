import api from '@/api'
const basePath = '/details'

export default {
  state: {
    allDetails: [],
    detailTypes: [{ value: 'brand', text: 'Бренд' }]
  },
  mutations: {
    setDetails(state, payload) {
      state.allBrands = payload
    },
    addDetail(state, newDetail) {
      state.allDetails.push(newDetail)
    },
    deleteDetail(state, id) {
      state.allDetails = state.allDetails.filter(item => item._id !== id)
    }
  },
  actions: {
    getAllDetails({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath)
          .then(({ data }) => {
            commit('setDetails', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    getDetailById(_, id) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath + '/' + id)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    createDetail({ commit }, newDetail) {
      return new Promise((resolve, reject) => {
        api
          .post(basePath, newDetail)
          .then(({ data }) => {
            commit('addDetail', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    updateDetail(_, { _id, name, description, type }) {
      return new Promise((resolve, reject) => {
        api
          .put(basePath + '/' + _id, { name, description, type })
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    },
    deleteDetail({ commit }, _id) {
      return new Promise((resolve, reject) => {
        api
          .delete(basePath + '/' + _id)
          .then(({ data }) => {
            commit('deleteDetail', _id)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    allDetails: state => state.allDetails
  }
}
