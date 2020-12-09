export const state = () => ({
  pageTitle: '',
  previousPage: ''
})

export const mutations = {
  setPageTitle (state, payload) {
    state.pageTitle = payload
  },
  setPreviousPage (state, payload) {
    state.previousPage = payload
  }
}

export const getters = {
  getPageTitle (state) {
    return state.pageTitle
  },
  getPreviousPage (state) {
    return state.previousPage
  }
}

export const actions = {
  setPageTitle ({ commit }, pageTitle) {
    commit('setPageTitle', pageTitle)
  },
  goToPage ({ commit }, previousPage, nextPage) {
    commit('setPreviousPage', previousPage)
    this.app.router.push(nextPage)
  },
  backToPreviousPage ({ getters }) {
    if (getters.getPreviousPage === '') {
      return this.app.router.push('/')
    }
    this.app.router.push(getters.getPreviousPage)
  }
}
