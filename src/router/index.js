/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import mainRoutes from './mainRoutes.js'
import { userMenuList } from '@/api/user'
import { isURL, clearLoginInfo } from '@/utils/utils'
import { Loading, Message } from 'element-ui'
import store from '@/store'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
    { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404' } },
]

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})
var loading= null;

router.beforeEach((to, from, next) => {
    var token= store.getters.token;

    if(!token && (fnCurrentRouteType(to, globalRoutes) != 'global')){
        clearLoginInfo()
        next({
            name: 'login',
            query: {
                url: encodeURIComponent(to.fullPath),
            },
            replace: true
        })
        return
    }
    if(router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global'){
        next()
    }else{
        loading = Loading.service({
            lock: true,
        })
        userMenuList().then((res)=> {
            fnAddDynamicMenuRoutes(res.data.list)
            router.options.isAddDynamicMenuRoutes = true;
            sessionStorage.setItem('menuList', JSON.stringify(res.data.list || '[]'))

            next({ ...to, replace: true })
            loading.close()
        }).catch(()=> {
            loading.close()
        })
    }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
    var temp = []
    for (var i = 0; i < globalRoutes.length; i++) {
        if (route.path === globalRoutes[i].path) {
            return 'global'
        } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = []) {
    var routes = [];

    computedMenuRoutes(menuList)

    mainRoutes.name = 'main-dynamic';
    mainRoutes.children = routes;
    router.addRoutes([
        mainRoutes,
        { path: '*', redirect: { name: '404' } }
    ])

    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')

    function computedMenuRoutes (list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].list && list[i].list.length >= 1) {
                computedMenuRoutes(list[i].list)
            } else {
                list[i].url = list[i].url.replace(/^\//, '')
                var route = {
                    path: list[i].url.replace('/', '-'),
                    component: null,
                    name: list[i].url.replace('/', '-'),
                    meta: {
                        menuId: list[i].menuId,
                        title: list[i].name,
                        isDynamic: true,
                        isTab: true,
                        iframeUrl: ''
                    }
                }
                // url以http[s]://开头, 通过iframe展示
                if (isURL(list[i].url)) {
                    route['path'] = `i-${list[i].menuId}`
                    route['name'] = `i-${list[i].menuId}`
                    route['meta']['iframeUrl'] = list[i].url
                } else {
                    try {
                        route['component'] = _import(`modules/${list[i].url}`) || null
                    } catch (e) {
                    }
                }
                routes.push(route)
            }
        }
    }
}

export default router
