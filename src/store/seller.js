import { firestore } from '~/plugins/firebase'

export const state = () => ({
  store: {
    id: '',
    name: ''
  },
  registerURL: '/sellers/kyc',
  redirectURL: '/sellers'
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
  }
}

export const actions = {
  async initStore ({ commit, rootGetters }) {
    try {
      const user = rootGetters['user/getUser']
      if (!user.uid) {
        return
      }
      const snapshot = await firestore.collection('sellers').where('uid', '==', user.uid).get()
      if (snapshot.size) {
        let sellerId = ''
        let sellerName = ''
        snapshot.forEach((doc) => {
          sellerId = doc.id
          sellerName = doc.data().storeName
        })
        const store = {
          id: sellerId,
          name: sellerName
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
  }
}
