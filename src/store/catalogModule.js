import api from '@/api'
const basePath = '/catalog'

export default {
  state: {
    catalogList: [],
    parents: [],
    allCatalogItems: [],
    volumeTypes: [0.1, 0.25, 0.5, 0.7, 1, 3],
    abvs: [40, 36.6, 24, 12, 0],
    skuTypes: ['Классическая', 'Какая-то другая, не классическая'],
    segments: ['Эконом', 'Премиум', 'Супер премиум']
  },
  mutations: {
    setCatalogList(state, payload) {
      state.catalogList = payload
    },
    clearCatalog(state) {
      state.catalogList = Object.assign([])
    },
    addToAllCatalogItems(state, items) {
      state.allCatalogItems = items.map(item => ({
        value: item._id,
        text: `${item.name}  - ${item.sku}`
      }))
    },
    addToParent({ parents }, payload) {
      payload.forEach(item => {
        if (item.type === 'group' && parents.findIndex(p => p._id === item._id) === -1) {
          parents.push(item)
        }
      })
    }
  },
  actions: {
    getCatalogGroups({ commit }) {
      api
        .get('/catalog', { params: { allGroups: true } })
        .then(response => commit('addToParent', response.data))
        .catch(e => commit('setError', e.message))
    },
    getCatalogItemsForAutocomplete({ commit }) {
      api
        .get('/catalog', { params: { allItems: true } })
        .then(({ data }) => commit('addToAllCatalogItems', data))
        .catch(e => commit('setError', e.message))
    },
    getCatalog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .get('/catalog', {
            params: payload
          })
          .then(response => {
            commit('setCatalogList', response.data)
            commit('addToParent', response.data)
            resolve(response.data)
          })
          .catch(e => {
            commit('setError', e.message)
            reject(e)
          })
      })
    },
    newCatalogItem(store, payload) {
      return new Promise((resolve, reject) => {
        api
          .post('/catalog', payload)
          .then(response => resolve(response.data))
          .catch(e => reject(e))
      })
    },
    removeCatalog(_, id) {
      return new Promise((resolve, reject) => {
        api
          .delete(basePath + '/' + id)
          .then(response => resolve(response.data))
          .catch(e => reject(e))
      })
    },
    getCatalogItemById({ getters }, id) {
      return new Promise((resolve, reject) => {
        //
        api
          .get(basePath + '/' + id, { params: { date: getters.currentDate } })
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    }
  },
  getters: {
    catalogList: state => state.catalogList.sort((a, b) => a.rank - b.rank),
    containSku: ({ parents }) => group => {
      if (group && parents.length > 0) {
        const res = parents.find(item => item._id === group)
        if (res) return res.containSku
        else return false
      } else return false
    },
    containSubgroups: ({ parents }) => group => {
      if (group && parents.length > 0) {
        const res = parents.find(item => item._id === group)
        if (res) return res.containSubgroups
        else return true
      } else return true
    },
    parentItems: ({ parents }) => type => {
      let groups = []
      if (type === 'group') groups = parents.filter(item => item.containSubgroups)
      else groups = parents.filter(item => item.containSku)
      return groups.map(item => ({
        value: item._id,
        text: item.name
      }))
    },
    parentById: ({ parents }) => id => parents.find(item => item._id === id),
    allCatalogItems: ({ allCatalogItems }) => allCatalogItems,
    volumeTypes: ({ volumeTypes }) => volumeTypes,
    skuTypes: ({ skuTypes }) => skuTypes,
    allSegments: ({ segments }) => segments,
    abvs: ({ abvs }) => abvs
  }
}
