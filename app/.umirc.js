
// ref: https://umijs.org/config/
export default {
  routes: [
    { path: '/', component: './index.js' },
    {
      path: '/register',
      component: './register/index.js'
    },
    {
      path: '/main',
      redirect: '/main/home'
    },
    {
      component: './main/_layout.js',
      routes: [
        { path: '/main/home', component: './main/home/index.js' },
        { path: '/main/funs', component: './main/funs/index.js' },
        { path: '/main/personal', component: './main/personal/index.js' },
      ]
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
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
