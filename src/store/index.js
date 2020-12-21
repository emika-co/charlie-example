export const state = () => ({
  pageTitle: '',
  loading: false
})

export const mutations = {
  setPageTitle (state, payload) {
    state.pageTitle = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  getPageTitle (state) {
    return state.pageTitle
  },
  isLoading (state) {
    return state.loading
  }
}

export const actions = {
  nuxtClientInit ({ commit }, { $cookies }) {
    const cookies = $cookies.get()
    if (cookies.auth) {
      const auth = JSON.parse(cookies.auth)
      commit('user/setUser', auth)
    }
    if (cookies.store) {
      const store = JSON.parse(cookies.store)
      commit('seller/setStore', store)
    }
  },
  setPageTitle ({ commit }, pageTitle) {
    commit('setPageTitle', pageTitle)
  },
  loading ({ commit }, isLoading) {
    commit('setLoading', isLoading)
  }
}
