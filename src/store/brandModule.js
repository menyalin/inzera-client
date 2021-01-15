import api from '@/api'
const basePath = '/brands'

export default {
  state: {
    allBrands: []
  },
  mutations: {
    setBrands(state, payload) {
      state.allBrands = payload
    },
    addBrand(state, newBrand) {
      state.allBrands.push(newBrand)
    },
    deleteBrand(state, id) {
      state.allBrands = state.allBrands.filter(item => item._id !== id)
    }
  },
  actions: {
    getAllBrands({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath)
          .then(({ data }) => {
            commit('setBrands', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    getBrandById(_, id) {
      return new Promise((resolve, reject) => {
        api
          .get(basePath + '/' + id)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    createBrand({ commit }, newBrand) {
      return new Promise((resolve, reject) => {
        api
          .post(basePath, newBrand)
          .then(({ data }) => {
            commit('addBrand', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },
    updateBrand(_, { _id, name, description }) {
      return new Promise((resolve, reject) => {
        api
          .put(basePath + '/' + _id, { name, description })
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    },
    deleteBrand({ commit }, _id) {
      return new Promise((resolve, reject) => {
        api
          .delete(basePath + '/' + _id)
          .then(({ data }) => {
            commit('deleteBrand', _id)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    allBrands: state => state.allBrands
  }
}
