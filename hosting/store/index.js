import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
        commit('user/setUser', auth)
      } catch (error) {
        // invalid cookie
      }
    }
  }
}
