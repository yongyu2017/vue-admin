<template>
    <div :class="['site-content', $route.meta.isTab? 'site-content--tabs': '']">
        <el-tabs
                v-if="$route.meta.isTab"
                v-model="mainTabsActiveName"
                :closable="true"
                @tab-click="selectedTabHandle"
                @tab-remove="removeTabHandle">
            <el-dropdown class="site-tabs__tools" :show-timeout="0">
                <span class="icon-box">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="refresh">刷新当前标签页</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-tab-pane
                    v-for="item in mainTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name">
                <el-card :body-style="siteContentViewHeight">
                    <iframe
                            v-if="item.type=== 'iframe'"
                            :src="item.iframeUrl"
                            width="100%" height="100%" frameborder="0" scrolling="yes">
                    </iframe>
                    <keep-alive v-else>
                        <router-view/>
                    </keep-alive>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-card :body-style="siteContentViewHeight" v-else>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </el-card>
    </div>
</template>

<script>
    import { deepCopy, isURL } from '@/utils/utils'

    export default {
        inject: ['refresh'],
        data () {
            return {}
        },
        computed: {
            documentClientHeight: {
                get () {
                    return this.$store.state.documentClientHeight
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
            siteContentViewHeight () {
                var height = this.documentClientHeight - 50 - 30 -40;
                if (this.$route.meta.isTab) {
                    height -= 40;
                    return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
                }
                return { minHeight: height + 'px' }
            }
        },
        mounted () {
        },
        methods: {
            // tabs, 选中tab
            selectedTabHandle: function (tab) {
                var tab= this.mainTabs.filter((value, index, array)=> {
                    return value.name== tab.name
                })[0];

                if(tab){
                    if (tab.name == this.$route.name) {
                        return
                    }

                    this.$router.push({
                        name: tab.name,
                        query: tab.query,
                        params: tab.params,
                    })
                }
            },
            // tabs, 删除tab
            removeTabHandle: function (tabName) {
                this.mainTabs= this.mainTabs.filter((value, index, array)=> {
                    return value.name!= tabName
                })

                if(this.mainTabs.length> 0){
                    var tab= this.mainTabs[this.mainTabs.length- 1];

                    if (tab.name == this.$route.name) {
                        return
                    }
                    this.$router.push({
                        name: tab.name,
                        query: tab.query,
                        params: tab.params,
                    })
                }else{
                    this.$router.push({ name: 'home' })
                }
            },
            // tabs, 关闭当前
            tabsCloseCurrentHandle: function () {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            // tabs, 关闭其它
            tabsCloseOtherHandle: function () {
                this.mainTabs = this.mainTabs.filter((value, index, array)=> {
                    return value.name== this.mainTabsActiveName
                })
            },
            // tabs, 关闭全部
            tabsCloseAllHandle: function () {
                this.mainTabs = [];
                this.$router.push({ name: 'home' })
            },
        }
    }
</script>

