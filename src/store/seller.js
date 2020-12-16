export const state = () => ({
  store: {
    id: '',
    name: ''
  },
  registerURL: '/sellers/kyc',
  redirectURL: '/sellers/stores'
})

export const mutations = {
  setStore (state, payload) {
    state.store.id = payload.id
    state.store.name = payload.name
  }
}

export const getters = {
  getStore (state) {
    return state.store
  },
  getRegisterURL (state) {
    return state.registerURL
  },
  getRedirectURL (state) {
    return state.redirectURL
  }
}

export const actions = {
  setStore ({ commit }, store) {
    commit('setStore', store)
  }
}
