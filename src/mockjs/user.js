import Mock from 'mockjs'

export default {
    //登录
    login: (config)=> {
        var data= JSON.parse(config.body);

        if(data.name== 'admin' && data.password== '123456'){
            return {
                code: 0,
                data: {
                    'userName': '小猪',
                    'sex': '男',
                    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9'
                }
            }
        }else{
            return {
                code: -1,
                data: '',
                msg: '帐号或密码错误！'
            }
        }
    },
    //菜单列表
    menuList: (config)=> {
        var data= JSON.parse(config.body);

        if(data.token== ''){
            return {
                code: 401,
                data: '',
                msg: '登录过期，请重新登录',
            }
        }else{
            return {
                code: 0,
                data: {
                    list: [
                        {
                            menuId: 1,
                            name: '人事管理',
                            url: '',
                            icon: 'user',
                            list: [
                                {
                                    menuId: 2,
                                    name: '员工列表',
                                    url: 'personnel/list',
                                    icon: 'star-off',
                                },
                                {
                                    menuId: 3,
                                    name: '考勤管理',
                                    url: '',
                                    icon: 'goods',
                                    list: [
                                        {
                                            menuId: 4,
                                            name: '考勤列表',
                                            url: 'personnel/attendance',
                                            icon: 'help',
                                        }
                                    ],
                                }
                            ]
                        },
                        {
                            menuId: 5,
                            name: '商户管理',
                            url: '',
                            icon: 'picture-outline-round',
                            list: [
                                {
                                    menuId: 6,
                                    name: '商户列表',
                                    url: 'merchants/list',
                                    icon: 'video-camera',
                                },
                            ]
                        },
                        {
                            menuId: 7,
                            name: 'Element',
                            url: 'https://element.eleme.cn/#/zh-CN/component/tabs',
                            icon: 'c-scale-to-original',
                        }
                    ]
                },
            }
        }
    },
    //员工列表
    userList: (config)=> {
        var data= JSON.parse(config.body);

        if(data.token== ''){
            return {
                code: 401,
                data: '',
                msg: '登录过期，请重新登录',
            }
        }else{
            var list= [],
                sum= 85,
                start= (data.startPage- 1)* data.pageSize,
                end= start+ data.pageSize;

            for(var i=0; i< sum; i++){
                list.push({
                    id: i+ 1,
                    name: '张三_'+ i,
                    age: Math.floor(Math.random()* 100),
                    sex: 1
                })
            }
            list= list.filter((value, index, array)=> {
                if(data.name== ''){
                    return true
                }else{
                    if(value.name.indexOf(data.name.toLocaleLowerCase())!= -1){
                        return true
                    }
                }
            })
            return {
                code: 0,
                data: {
                    list: list.slice(start, end),
                    sum: sum,
                },
            }
        }
    },
}
