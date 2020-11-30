export default ({ store, redirect }) => {
  if (store.state.user.user.uid) {
    return redirect(store.getters['user/getAuthRedirectURL'])
  }
}
