<template>
    <el-form ref="dataForm" :rules="dataRule" :inline="true" :model="dataForm" label-width="80px" @keyup.enter.native="loginFun()" @submit.native.prevent>
        <el-form-item label="帐号" prop="name">
            <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="dataForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginFun">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { userLogin, needCaptcha } from '@/api/user'
    import { mapMutations } from 'vuex'

    export default {
        data () {
            return {
                dataForm: {
                    name: 'admin',
                    password: '123456',
                },
                dataRule: {
                    name: [
                        { required: true, message: '请输入帐号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted () {
            needCaptcha()
        },
        methods: {
            ...mapMutations({
                setToken: 'SET_TOKEN',
                setUserInfo: 'SET_USER_INFO',
            }),
            //登录
            loginFun: function () {
                this.$refs.dataForm.validate((valid)=> {
                    if(valid){

                        var loading = this.$loading({
                            lock: true,
                        })

                        userLogin({
                            name: this.dataForm.name,
                            password: this.dataForm.password,
                        }).then((res)=> {
                            loading.close()
                            this.setToken(res.data.token)
                            this.setUserInfo(res.data)

                            this.$router.replace({
                                name: 'home'
                            }).catch(()=> {
                            })

                        }).catch(()=> {
                            loading.close()
                        })

                    }
                })
            }
        },
    }
</script>

<style>
</style>
