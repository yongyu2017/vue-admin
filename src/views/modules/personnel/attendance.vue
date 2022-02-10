<template>
    <div>
        attendance
    </div>
</template>

<script>
    import { userUserList } from '@/api/user.js'
    import { clearLoginInfo } from '@/utils/utils'

    export default {
        data () {
            return {
                dataForm: {
                    name: '',
                },
                dataRule: {
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
            }
        },
        mounted () {
            // clearLoginInfo()
            // this.userUserListFun()
        },
        methods: {
            //获取列表
            userUserListFun: function () {
                this.dataListLoading = true;

                userUserList({
                    'name': this.dataForm.name,
                    'startPage': this.pageIndex,
                    'pageSize': this.pageSize
                }).then((res)=> {
                    var data= res.data;

                    this.dataList= data.list.slice();
                    this.totalPage= data.sum;
                    this.dataListLoading = false;
                }).catch(()=> {
                    this.dataListLoading = false;
                })
            },
        },
    }
</script>

<style>
</style>
