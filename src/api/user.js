import request from '@/utils/httpRequest.js'

//登录
export function userLogin(data) {
    return request({
        url: 'http://localhost/user/login',
        method: 'post',
        data: data
    })
}

//菜单
export function userMenuList(data) {
    return request({
        url: 'http://localhost/user/menuList',
        method: 'post',
        data: data
    })
}

//员工列表
export function userUserList(data) {
    return request({
        url: 'http://localhost/user/userList',
        method: 'post',
        data: data
    })
}
