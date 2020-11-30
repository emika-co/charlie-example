import Cookies from 'js-cookie'

// eslint-disable-next-line no-empty-pattern
export default ({ }, inject) => {
  inject('cookies', Cookies)
}
