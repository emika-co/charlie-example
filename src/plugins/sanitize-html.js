import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

const options = {
  // allowedTags: ['a', 'b'],
  // allowedAttributes: {
  //   a: ['href']
  // }
}

Vue.use(VueSanitize, options)

// eslint-disable-next-line no-empty-pattern
// export default ({ }, inject) => {
//   inject('sanitize', VueSanitize)
// }
