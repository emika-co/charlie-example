export default ({ store, redirect }) => {
  if (store.state.seller.store.id) {
    return redirect(store.state.seller.redirectURL)
  }
}
