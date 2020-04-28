import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import dayjs from 'dayjs'
Vue.filter('date', (val) => {
  if (!val) {
    return '日期错误'
  }

  return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
})

import http from './http'
Vue.prototype.$http = http;

import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
