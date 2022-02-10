<template>
    <div>
        <el-form :inline="true" :model="dataForm" size="medium" @keyup.enter.native="searchFun">
            <el-form-item>
                <el-input v-model.trim="dataForm.name" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="searchFun">搜索</el-button>
                <el-button type="primary" @click="addFun()">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList"
                border
                v-loading="dataListLoading"
                style="width: 100%;">
            <el-table-column
                    prop="id"
                    header-align="center"
                    align="center"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="name"
                    header-align="center"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    header-align="center"
                    align="center"
                    label="性别">
                <template slot-scope="scope">{{ scope.row.sex== 1?  '男': '女' }}</template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    header-align="center"
                    align="center"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    header-align="center"
                    align="center"
                    width="140"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addFun(scope.row.id, scope.row.name, scope.row.sex, scope.row.age)">修改</el-button>
                    <el-button type="text" size="small" @click="toAttendanceFun(scope.row.id, scope.row.name)">考勤</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <!-- 员工信息弹窗 -->
        <listAddOrUpdate ref="listAddOrUpdate" @refreshDataList="searchFun" @close="listAddOrUpdateVisible= false" v-if="listAddOrUpdateVisible"></listAddOrUpdate>
    </div>
</template>

<script>
    import { userUserList } from '@/api/user.js'
    import listAddOrUpdate from './list-add-or-update.vue'

    export default {
        components: {
            listAddOrUpdate,
        },
        data () {
            return {
                dataForm: {
                    name: '',
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                listAddOrUpdateVisible: false,  //员工信息弹窗
            }
        },
        mounted () {
            this.searchFun()
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
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.userUserListFun()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.userUserListFun()
            },
            //查询
            searchFun: function () {
                this.pageIndex = 1
                this.userUserListFun()
            },
            //新增/修改员工信息
            addFun: function (id, name, sex, age) {
                this.listAddOrUpdateVisible= true;
                this.$nextTick(()=> {
                    this.$refs.listAddOrUpdate.init(id, name, sex, age)
                })
            },
            //跳转到考勤列表
            toAttendanceFun: function (id, name) {
                this.$router.push({
                    name: 'personnel-attendance',
                    query: {
                        id,
                        name,
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
</style>
