<template>
    <el-dialog
        @close="closeFun"
        width="500px"
        :title="!dataForm.id ? '新增' : '修改'"
        :close-on-click-modal="false"
        :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model.trim="dataForm.name" placeholder="请输入房型名称"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="dataForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
                <el-input v-model.trim="dataForm.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                dataForm: {
                    id: '',  //修改时填写
                    name: '',
                    sex: 1,
                    age: '',
                },
                dataRule: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '性别不能为空', trigger: 'blur' },
                    ],
                    age: [
                        { required: true, message: '年龄不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            init (id, name, sex, age) {
                if(id){
                    this.dataForm.id= id;
                    this.dataForm.name= name;
                    this.dataForm.sex= sex;
                    this.dataForm.age= age;
                }
                this.visible = true;

                this.$nextTick(() => {
                })
            },
            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        var loading = this.$loading({
                            lock: true,
                        })

                        setTimeout(()=> {
                            loading.close()
                            this.visible = false
                            this.$emit('refreshDataList')
                        }, 1000)
                    }
                })
            },
            //关闭
            closeFun: function () {
                this.$emit('close')
            }
        }
    }
</script>
