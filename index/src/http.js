import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://127.0.0.1:7001/index/api',
    withCredentials: true,
    crossDomain: true                      // 跨域
});

// request 拦截器，设置请求头中的token
http.interceptors.request.use((request) => {
    // 获取token
    const token = sessionStorage.getItem('token') || '';

    if (token) {
        request.headers.Authorization = 'Carfied ' + token;
    }

    return request
}, (error) => {
    window.alert('token 错误');
    return Promise.reject(error);
});


// response 拦截器
http.interceptors.response.use((response) => {
    return response
}, (err) => {
    if (err.response.status === 500) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data
        });
        return
    }

    if (err.response.status === 404) {
        Vue.prototype.$message({
            type: 'error',
            message: '找不到资源'
        });
        return
    }

    Promise.reject(err);
});


export default http