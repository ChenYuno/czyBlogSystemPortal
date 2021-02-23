export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'czyblogportal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet',href:'/css/font-awesome.min.css'},
      {rel:'stylesheet',href:'/css/mdui.min.css',ssr: false}
    ],
    script: [
      {
        src:'/live2dw/lib/L2Dwidget.min.js',
        type:'text/javascript'
      },
      {
        src:'/live2dw/lib/L2Dwidget.0.min.js',
        type:'text/javascript'
      },
      {
        src:'/js/time.js',
        type:'text/javascript'
      },
      {
        src:'/js/scorll.js',
        type:'text/javascript'
      },
      {
        src:'/js/ripple.js',
        type:'text/javascript'
      },
      {
        src:'https://cdn.jsdelivr.net/gh/yremp/yremp-js@1.5/sakura.js',
        type:'text/javascript'
      },
      {
        src:'/js/mdui.min.js',
        type:'text/javascript',
        ssr: false
      },
      {
        src:'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js',
        type:'text/javascript',
        ssr: false
      },

    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'vuesax/dist/vuesax.css',
    'animate.css',
    '@/assets/icon/iconfont.css',
    'assets/main.css',
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/typed',
    {src:'~/plugins/word-cloud',ssr:false},
    {src:'~/plugins/router',ssr:false},
    { src: '~plugins/nuxt-quill-plugin', ssr: false },
    {
      src: "@/plugins/element-ui",
      ssr: false  // 关闭ssr
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/user/': {
      target: 'http://localhost:9000', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
    },
    '/portal': {
      target: 'http://localhost:9000', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
    },
    '/admin': {
      target: 'http://localhost:9000', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {

      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  }
}
