export default {
  routes: [
    { path: '/', component: './index.js' },
    {
      path: '/register',
      component: './form/index.js'
    },
    {
      path: '/edit',
      component: './form/index.js'
    },
    {
      path: '/main',
      redirect: '/main/home'
    },
    {
      component: './main/_layout.js',
      routes: [
        { path: '/main/home', component: './main/home/index.js' },
        { path: '/main/siblings', component: './main/home/siblings.js' },
        { path: '/main/funs', component: './main/funs/index.js' },
        { path: '/main/personal', component: './main/personal/index.js' },
        { path: '/main/favorite', component: './main/favorite/index.js' },
        { path: '/main/favorite/submit', component: './main/favorite/submit.js' },
      ]
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loading',
      },
      title: 'app',
      dll: true,
      pwa: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
}
