import axios from 'axios'
import { baseUrl } from '@/utils/environment'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { clearLoginInfo } from '@/utils/utils'

const http = axios.create({
    baseURL: process.env.NODE_ENV== 'development'? process.env.VUE_APP_BASE_API: '',
    timeout: 1000 * 10,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

/** 取消重复接口请求 **/
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
    for(let p in pending){
        if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f() //执行取消操作
            pending.splice(p, 1) //把这条记录从数组中移除
        }
    }
}
/** 取消重复接口请求 **/

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config['headers']['token']= store.state.token || '';  //请求头带上token
    config.data= config.data || {};
    config['data']['token']= store.state.token || '';

    removePending(config) //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c })
    })

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

    removePending(response.config)  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除

    if(res.code!== 0){
        if(res.code== 401){
            clearLoginInfo()
            router.push({
                name: 'login',
                query: {
                    url: encodeURIComponent(router.app._route.fullPath),
                },
            })
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
