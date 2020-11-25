import { auth } from '~/services/firebase'

export const state = () => ({
  user: {}
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const getters = {
  getUser (state) {
    return state.user
  }
}

export const actions = {
  async onAuth ({ commit }) {
    try {
      const result = await auth().getRedirectResult()
      if (result.credential) {
        const user = {
          name: result.user.displayName,
          email: result.user.email
        }
        commit('setUser', user)
        this.app.router.push('/users/test')
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
  // eslint-disable-next-line no-empty-pattern
  async signInWithRedirect ({ }, provider) {
    return await auth().signInWithRedirect(provider)
  },
  async signOut ({ commit }) {
    try {
      await auth().signOut()
      commit('setUser', null)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
}
