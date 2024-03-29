import { auth } from '~/plugins/firebase'

export const state = () => ({
  user: {
    uid: '',
    name: '',
    email: ''
  },
  authRedirectURL: '/users/history'
})

export const mutations = {
  setUser (state, payload) {
    if (payload) {
      if (payload.uid && payload.name && payload.email) {
        state.user.uid = payload.uid
        state.user.name = payload.name
        state.user.email = payload.email
        const auth = state.user
        // expires 1 day
        this.$cookies.set('auth', auth, { expires: 1 })
        return
      }
    }
    state.user = {
      uid: '',
      name: '',
      email: ''
    }
  }
}

export const getters = {
  getUser (state) {
    return state.user
  },
  getAuthRedirectURL (state) {
    return state.authRedirectURL
  },
  isAuthenticated (state) {
    if (state.user.uid) {
      return true
    }
    return false
  }
}

export const actions = {
  async onAuth ({ commit }) {
    try {
      const result = await auth().getRedirectResult()
      const user = {
        uid: '',
        name: '',
        email: ''
      }
      if (result.user) {
        user.uid = result.user.uid
        user.name = result.user.displayName
        user.email = result.user.email
      } else {
        const currentUser = await auth().currentUser
        if (currentUser) {
          user.uid = currentUser.uid
          user.name = currentUser.displayName
          user.email = currentUser.email
        }
      }
      if (user.uid) {
        commit('setUser', user)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  async signInWithFacebook ({ dispatch }) {
    try {
      const provider = new auth.FacebookAuthProvider()
      provider.addScope('email')
      await dispatch('signInWithRedirect', provider)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  async signInWithGoogle ({ dispatch }) {
    try {
      const provider = new auth.GoogleAuthProvider()
      await dispatch('signInWithRedirect', provider)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  async signInAnonymously () {
    try {
      await auth().signInAnonymously()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  onAuthStateChangedAnonymous () {
    try {
      auth().onAuthStateChanged()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  // eslint-disable-next-line no-empty-pattern
  async signInWithRedirect ({ }, provider) {
    return await auth().signInWithRedirect(provider)
  },
  async signOut ({ commit }) {
    try {
      this.$cookies.remove('auth')
      this.$cookies.remove('store')
      commit('setUser', null)
      await auth().signOut()
      this.app.router.push('/')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
}
