<template>
    <div
        class="site-wrapper"
        v-loading.fullscreen.lock="loading"
        element-loading-text="拼命加载中">
        <template v-if="!loading">
            <mainNavbar />
            <mainSidebar />
            <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight- 50 + 'px' }">
                <main-content v-if="!isRefresh" />
            </div>
        </template>
    </div>
</template>

<script>
    import mainContent from './main-content'
    import mainNavbar from './main-navbar'
    import mainSidebar from './main-sidebar'

    export default {
        provide () {
            return {
                // 刷新
                refresh: ()=> {
                    this.isRefresh= true;
                    this.$nextTick(() => {
                        this.isRefresh= false;
                    })
                }
            }
        },
        data () {
            return {
                loading: true,
                isRefresh: false,  //main-content是否刷新
            }
        },
        components: {
            mainContent,
            mainNavbar,
            mainSidebar,
        },
        computed: {
            documentClientHeight: {
                get () {
                    return this.$store.state.documentClientHeight
                },
                set (val) {
                    this.$store.commit('UPDATE_DOCUMENT_CLIENT_HEIGHT', val)
                }
            },
        },
        created () {
        },
        mounted () {
            this.loading = false;

            this.resetDocumentClientHeight()
        },
        methods: {
            // 重置窗口可视高度
            resetDocumentClientHeight () {
                this.documentClientHeight = document.documentElement['clientHeight'];
                window.addEventListener('resize', ()=> {
                    this.documentClientHeight = document.documentElement['clientHeight'];
                }, false)

            },
        }
    }
</script>
