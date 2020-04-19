// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http'
import dayjs from 'dayjs'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 定义一个对时间的过滤器
Vue.filter('date', (val, type) => {
  if (!val) {
    return '';
  }

  return dayjs(val).format(type)
})


Vue.config.productionTip = false

Vue.use(Element);
Vue.use(mavonEditor);
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
