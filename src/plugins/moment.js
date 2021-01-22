import moment from 'moment'

// eslint-disable-next-line no-empty-pattern
export default ({ }, inject) => {
  inject('moment', moment)
}
