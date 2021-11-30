import axios from 'axios'
import { baseUrl } from '@/utils/environment'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { clearLoginInfo } from '@/utils/utils'

const http = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 10,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config['headers']['token']= store.state.token || '';  //请求头带上token
    config.data= config.data || {};
    config['data']['token']= store.state.token || '';
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    var res= response.data;
    console.log('requestjs', response.config.url, res)

    if(res.code!== 0){
        if(res.code== 401){
            clearLoginInfo()
            router.push({ name: 'login' })
        }
        Message.error(res.msg || '程序异常')

        return Promise.reject(res)
    }else{
        return res
    }
}, error => {
    return Promise.reject(error)
})

export default http
