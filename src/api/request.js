import axios from 'axios'
// import store from "@/store/manager";
import router from '@/router'
import storage from "@/utils/localStorage";
import {
    ElLoading
} from 'element-plus'
const request = axios.create({
    baseURL: 'http://127.0.0.1:3001/api',
    timeout: 10000
})
let loading = null
request.interceptors.request.use((config) => {

    if (config.method == "get") {

        let str = '?'

        let data = Object.entries(config.data)
        console.log('req', data);
        if (data.length < 1) {
            str = ''
        } else {
            data.forEach((item) => {
                str += item[0] + '=' + item[1] + '&'
            })
            str = str.slice(0, -1)
        }
        config.url += str
        str = str.slice(0, -1)
        config.data = str
    }
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return config;
}, (err) => {
    //请求失败回调
    return Promise.reject(new Error('请求fail'))
})

request.interceptors.response.use((res) => {
    loading.close()

    if (res.data.code == "A401") {
        storage.removeLocal("my-hotel-2022-10-4-token")
        router.push('/login')
    }
    if (res.data.code == "A4001") {
        storage.removeLocal("my-hotel-2022-10-4-token")
        router.push('/login')
    }
    return res.data;
}, (err) => {
    loading.close()
    //请求失败回调
    return Promise.reject(new Error('响应fail'))
})

export default request