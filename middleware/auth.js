export default ({ store, redirect, route }) => {
  if (!isLogin(store) && route.name !== 'login') {
    return redirect('/')
  }
}

const isLogin = (store) => {
  return (store && store.state && store.state.user)
}
