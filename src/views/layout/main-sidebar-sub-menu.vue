<template>
    <el-submenu :index="menu.menuId+ ''" v-if="menu.list && menu.list.length> 0">
        <template slot="title">
            <i :class="['el-icon-'+ menu.icon]" v-if="menu.icon"></i>
            <span>{{ menu.name }}</span>
        </template>

        <mainSidebarSubMenu :menu="item" :dynamicMenuRoutes="dynamicMenuRoutes" v-for="(item, index) in menu.list" :key="index"></mainSidebarSubMenu>
    </el-submenu>
    <el-menu-item :index="menu.menuId+ ''" @click="gotoRouteHandle(menu)" v-else>
        <i :class="['el-icon-'+ menu.icon]" v-if="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
</template>

<script>
    import mainSidebarSubMenu from './main-sidebar-sub-menu'

    export default {
        name: 'mainSidebarSubMenu',  //组件递归时，必填
        components: {
            mainSidebarSubMenu,
        },
        props: {
            menu: {
                type: Object,
                required: true
            },
            dynamicMenuRoutes: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
            }
        },
        mounted () {
        },
        methods: {
            // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
            gotoRouteHandle: function (menu) {
                var route = this.dynamicMenuRoutes.filter((value, index, array)=> {
                    return value.meta.menuId== menu.menuId
                })
                if (route.length >= 1) {
                    if(route[0].name== this.$route.name){
                        return
                    }
                    this.$router.push({
                        name: route[0].name
                    })
                }
            }
        }
    }
</script>

<style scoped>
</style>
