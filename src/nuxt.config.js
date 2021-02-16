export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'filolo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;500&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', crossorigin: 'anonymous' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js', crossorigin: 'anonymous' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/app.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firebase',
    '~/plugins/cookie',
    '~/plugins/nuxt-client-init',
    '~/plugins/alert',
    '~/plugins/uuid',
    '~/plugins/sanitize-html',
    '~/plugins/moment'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/device'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-clipboard2',
    '@nuxtjs/toast'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  env: {
    environment: process.env.ENV || 'production',
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyAaYpCEJprT5eecDkrdjlMX6Sma3ANCZVU',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'charlie-296709.firebaseapp.com',
      projectId: process.env.FIREBASE_PROJECT_ID || 'charlie-296709',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'charlie-296709.appspot.com',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '874331299296',
      appId: process.env.FIREBASE_APP_ID || '1:874331299296:web:0ee90183a63ecda973df85',
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-J44GTCLBNC'
    }
  }
}
