import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

const options = {
  allowedTags: ['a', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li'],
  allowedAttributes: {
    a: ['href']
  }
}

Vue.use(VueSanitize, options)
