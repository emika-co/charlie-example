export default ({ store, redirect }) => {
  if (!store.state.seller.user.uid) {
    return redirect('/')
  } else if (!store.state.seller.store.id) {
    return redirect(store.state.store.registerURL)
  }
}
