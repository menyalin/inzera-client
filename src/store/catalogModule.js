import api from '@/api'

export default {
  state: {
    catalogList: [],
    parents: []
  },
  mutations: {
    setCatalogList(state, payload) {
      state.catalogList = payload
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
    initStore({ dispatch }) {
      dispatch('getCatalogGroups')
    },
    getCatalogGroups({ commit }) {
      api
        .get('/catalog', { params: { allGroups: true } })
        .then(response => commit('addToParent', response.data))
        .catch(e => commit('setError', e.message))
    },
    getCatalog({ commit }, payload) {
      // commit('setLoading', true)
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
          })
          .finally(() => {
            commit('setLoading', false)
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
    parentById: ({ parents }) => id => parents.find(item => item._id === id)
  }
}