<template>
    <div>
        <el-form :inline="true" :model="dataForm" size="medium" @keyup.enter.native="searchFun" @submit.native.prevent>
            <el-form-item>
                <el-input v-model.trim="dataForm.name" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="searchFun">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="dataList_filter"
                border
                v-loading="dataListLoading"
                style="width: 100%;">
            <el-table-column
                    prop="gift"
                    header-align="center"
                    align="center"
                    label="礼物">
            </el-table-column>
            <el-table-column
                    prop="label"
                    header-align="center"
                    align="center"
                    label="标签">
            </el-table-column>
            <el-table-column
                    prop="liking"
                    header-align="center"
                    align="center"
                    label="基础好感度">
            </el-table-column>
            <el-table-column
                    prop="people"
                    header-align="center"
                    align="center"
                    label="伙伴偏好">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>

    export default {
        data () {
            return {
                dataForm: {
                    name: '',
                },
                dataList: [],
                dataList_filter: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
            }
        },
        mounted () {
            var str= '' +
                '软软·小兔-萌物-2-阿暖,' +
                '琉璃盏-奇珍-2-离玉堂,' +
                '青玉砚台-雅好-2-苏小白,' +
                '孔明锁-趣玩-2-韩莹莹、蓝铮,' +
                '软软·小猴-萌物-6-阿暖,' +
                '火齐珠-奇珍-6-离玉堂,' +
                '紫毫笔-雅好-6-苏小白,' +
                '金王巧环-趣玩-6-韩莹莹、蓝铮,' +
                '多肉·小白-萌物-22-阿暖,' +
                '龙纹铜熏炉-奇珍-22-离玉堂,' +
                '漆烟徽墨-雅好-22-苏小白,' +
                '水玉圆镜-趣玩-22-韩莹莹、蓝铮,' +
                '镂金璃纹弓-奇珍-50-离玉堂,' +
                '杜鹃香囊-雅好-50-苏小白,' +
                '山河社稷图-雅好-50-苏小白,' +
                '淮阳皮影-趣玩-50-韩莹莹、蓝铮+,' +
                '双鲤玉佩-奇珍-50-离玉堂,' +
                '白羽扇-雅好-50-苏小白,' +
                '玲珑棋子-趣玩-50-韩莹莹、蓝铮、苏小白+,' +
                '泉沏大红袍-雅好-50-苏小白,' +
                '太乙拂尘-趣玩-50-韩莹莹、蓝铮,' +
                '傀儡小汪-奇珍-50-离玉堂、阿暖+,' +
                '青玉流云剑穗-雅好-50-苏小白,' +
                '玉兰花风车-雅好-50-苏小白,' +
                '多肉·小翠-萌物-50-阿暖、韩莹莹+';
            var arr= str.split(',');
            this.dataList= arr.map((value, index, array)=> {
                var value_arr= value.split('-'),
                    label_arr= ['gift', 'label', 'liking', 'people'],
                    ob= {};

                value_arr.forEach((value2, index2, array2)=> {
                    ob[label_arr[index2]]= value2;
                })
                return ob
            })

            this.searchFun()
        },
        methods: {
            //查询
            searchFun: function () {
                this.dataList_filter= this.dataList.filter((value, index, array)=> {
                    if(this.dataForm.name){
                        return value.gift.indexOf(this.dataForm.name)!= -1 || value.people.indexOf(this.dataForm.name)!= -1
                    }else{
                        return true
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
</style>
