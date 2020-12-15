export const state = () => ({
  pageTitle: '',
  previousPage: '',
  currentPage: ''
})

export const mutations = {
  setPageTitle (state, payload) {
    state.pageTitle = payload
  },
  setPreviousPage (state, payload) {
    state.previousPage = payload
  },
  setCurrentPage (state, payload) {
    state.currentPage = payload
  }
}

export const getters = {
  getPageTitle (state) {
    return state.pageTitle
  },
  getPreviousPage (state) {
    return state.previousPage
  },
  getCurrentPage (state) {
    return state.currentPage
  }
}

export const actions = {
  nuxtClientInit ({ commit }, { $cookies }) {
    const cookies = $cookies.get()
    if (cookies.auth) {
      const auth = JSON.parse(cookies.auth)
      commit('user/setUser', auth)
    }
  },
  setPageTitle ({ commit }, pageTitle) {
    commit('setPageTitle', pageTitle)
  },
  goToPage ({ commit, getters }, nextPage) {
    commit('setPreviousPage', getters.getPreviousPage)
    this.app.router.push(nextPage)
  },
  backToPreviousPage ({ getters }) {
    if (getters.getPreviousPage === '') {
      return this.app.router.push('/')
    }
    this.app.router.push(getters.getPreviousPage)
  },
  setCurrentPage ({ commit }, currentPage) {
    commit('setCurrentPage', currentPage)
  }
}
