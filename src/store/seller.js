import { firestore } from '~/plugins/firebase'

export const state = () => ({
  store: {
    id: '',
    name: ''
  },
  registerURL: '/sellers/kyc',
  redirectURL: '/sellers',
  dashboardURL: '/sellers/dashboard'
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
  },
  hasStore (state) {
    if (state.store.id) {
      return true
    }
    return false
  },
  getDashboardURL (state) {
    return state.dashboardURL
  }
}

export const actions = {
  async initStore ({ commit, rootGetters }) {
    try {
      const user = rootGetters['user/getUser']
      if (!user.uid) {
        return
      }
      const snapshot = await firestore.collection('sellers').doc(user.uid).get()
      if (snapshot.exists) {
        const store = {
          id: user.uid,
          name: snapshot.data().storeName
        }
        this.$cookies.set('store', store, { expires: 1 })
        commit('setStore', store)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  setStore ({ commit }, store) {
    commit('setStore', store)
  },
  async setStoreFromCookie ({ commit }, store) {
    const snapshot = await firestore.collection('sellers').doc(store.id).get()
    if (snapshot.exists) {
      return commit('setStore', store)
    }
    this.$cookies.remove('store')
    this.app.router.push('/')
  }
}
