<template>
    <div class="site-sidebar site-sidebar--dark">
        <div class="site-sidebar__inner">
            <el-menu
                    class="site-sidebar__menu"
                    :default-active="menuActiveName || 'home'">
                <mainSidebarSubMenu :menu="item" :dynamicMenuRoutes="dynamicMenuRoutes" v-for="(item, index) in menuList" :key="index"></mainSidebarSubMenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import mainSidebarSubMenu from './main-sidebar-sub-menu'
    import { deepCopy, isURL } from '@/utils/utils.js'

    export default {
        components: {
            mainSidebarSubMenu,
        },
        data() {
            return {
            }
        },
        computed: {
            menuList: {
                get () {
                    return this.$store.state.menuList
                },
                set (val) {
                    this.$store.commit('UPDATE_MENU_LIST', val)
                },
            },
            menuActiveName: {
                get () {
                    return this.$store.state.menuActiveName
                },
                set (val) {
                    this.$store.commit('UPDATE_MENU_ACTIVE_NAME', val)
                }
            },
            mainTabs: {
                get () {
                    return this.$store.state.mainTabs
                },
                set (val) {
                    this.$store.commit('UPDATE_MAIN_TABS', val)
                }
            },
            mainTabsActiveName: {
                get () {
                    return this.$store.state.mainTabsActiveName
                },
                set (val) {
                    this.$store.commit('UPDATE_MAIN_TABS_ACTIVE_NAME', val)
                }
            },
        },
        watch: {
            $route: 'routeHandle'
        },
        created () {
            this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]');
            this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]');

            this.routeHandle(this.$route)
        },
        methods: {
            // 路由操作
            routeHandle: function (route) {
                if (route.meta.isTab) {
                    var tab= this.mainTabs.filter((value, index, array)=> {
                            return value.name== route.name
                        })[0],
                        Index= (()=> {
                            var poc= 0;
                            this.mainTabs.forEach((value, index, array)=> {
                                if(value.name === route.name){
                                    poc= index
                                }
                            })
                            return poc
                        })();

                    if(!tab){
                        tab= {
                            menuId: route.meta.menuId || route.name,
                            name: route.name,
                            title: route.meta.title,
                            type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                            iframeUrl: route.meta.iframeUrl || '',
                            params: route.params,
                            query: route.query
                        }
                        this.mainTabs.push(tab)
                    }else{
                        var arr= deepCopy(this.mainTabs);

                        arr[Index].params= route.params;
                        arr[Index].query= route.query;

                        this.mainTabs= arr;
                    }

                    this.mainTabsActiveName = tab.name;
                }
                this.menuActiveName= route.meta.menuId+ '';
            },
        }
    }
</script>

<style scoped>
</style>
