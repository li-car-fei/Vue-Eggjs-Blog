import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    baseURL: 'http://127.0.0.1:7001/admin/api'
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


// response 拦截器 ， 通过判断 status 执行操作
http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 500) {
        Vue.prototype.$message({
            type: 'error',
            message: error.response.data
        });
        return
    }

    if (error.response.status === 401) {
        // 跳转到登录界面
        router.push('/login');
        return
    }

    // 其他错误
    return Promise.reject(error);
});

export default http