import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:7001/index/api'
});

// 添加 response 拦截器
http.interceptors.response.use((response) => {
    // 无错误，正常返回
    return response
}, (err) => {

    // 如果状态码 500 服务器错误
    if (err.response.status === 500) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data
        });
        return
    }

    // 如果状态码 404 找不到url
    if (err.response.status === 404) {
        Vue.prototype.$message({
            type: 'error',
            message: 'url错误，找不到路由'
        });
        return
    }

    // 其他错误，抛出
    return Promise.reject(err);
})

export default http