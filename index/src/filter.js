import Vue from 'vue'
import dayjs from 'dayjs'

// 定义一个日期过滤器，页面中可直接使用
Vue.filter('date', (val, type) => {
    return dayjs(val).format(type)
})