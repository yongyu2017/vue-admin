<template>
    <div class="site-navbar">
        <div class="site-navbar__header">
            <h1 class="site-navbar__brand">后台管理系统</h1>
        </div>

        <div class="site-navbar__body fix">
            <el-menu class="site-navbar__menu" mode="horizontal">
                <el-menu-item class="site-navbar__avatar" index="3">
                    <el-dropdown :show-timeout="0" placement="bottom">
                        <span class="el-dropdown-link">
                            <img src="~@/assets/img/avatar.png" :alt="userInfo.userName">{{ userInfo.userName }}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="logoutHandle">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { clearLoginInfo } from '@/utils/utils'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        mounted () {
        },
        methods: {
            // 退出
            logoutHandle () {
                this.$confirm(`确定进行[退出]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    clearLoginInfo()
                    this.$router.push({ name: 'login' })
                }).catch(() => {})
            }
        }
    }
</script>

<style scoped>
</style>
