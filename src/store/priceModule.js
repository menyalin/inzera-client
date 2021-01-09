import api from '@/api'
import moment from 'moment'

const formatDate = (dateStr, format = 'YYYY-MM-DD') => {
  if (dateStr) {
    return moment(dateStr).format(format)
  } else return null
}

export default {
  state: {
    setPrices: []
  },
  mutations: {
    setSetPrices(state, payload) {
      state.setPrices = payload
    },
    addSetPrice(state, payload) {
      console.log('new setPrice', payload)
      state.setPrices.push(payload)
    },
    deleteSetPrice(state, id) {
      state.setPrices = state.setPrices.filter(item => item._id !== id)
    }
  },
  actions: {
    getAllSetPrices({ commit }) {
      api
        .get('/price/setPrices')
        .then(({ data }) => {
          data.forEach(item => {
            item.startDateFormatted = formatDate(item.startDate)
            item.endDateFormatted = formatDate(item.endDate)
            item.createdAtFormatted = formatDate(item.createdAt, 'YYYY-MM-DD HH:mm:ss')
          })
          commit('setSetPrices', data)
        })
        .catch(e => {
          commit('setError', e.message)
        })
    },
    deleteSetPrice({ commit }, setPriceId) {
      api
        .delete(`/price/setPrices/${setPriceId}`)
        .then(() => commit('deleteSetPrice', setPriceId))
        .catch(e => commit('setError', e.message))
    },
    createSetPrice({commit}, newSetPrice) {
      return new Promise((resolve, reject) => {
        api
        .post('/price/setPrices', newSetPrice)
        .then(({data}) => {
          commit('addSetPrice', data)
          resolve(data)
        })
        .catch(e => commit('setError', e.message))
      })
      
    }
  },
  getters: {
    allSetPrices: ({ setPrices }) => setPrices
  }
}
