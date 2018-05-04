module.exports = {
  router: {
    middleware: 'stats'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'itraffic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/fontawesome-free-5.0.10/svg-with-js/css/fa-svg-with-js.css' }
    ],
    script: [
      { src: '/fontawesome-free-5.0.10/svg-with-js/js/fontawesome-all.min.js' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    'element-theme-ink/lib/index.css',
    '~assets/css/app.scss'
  ],
  build: {
    vendor: ['element-ui'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    {src:'~plugins/element-ui', ssr: true},
    {src:'~plugins/valine', ssr: false},
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
    baseURL: 'http://localhost:8000'
  },
  proxy: {
    '/api/': 'http://localhost:8000'
  }
}
