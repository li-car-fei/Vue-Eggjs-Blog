import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://127.0.0.1:7001/index/api'
});

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