import Mock from 'mockjs'
import userApi from './user.js'

Mock.setup({
    timeout: '300-600'
})

Mock.mock('http://localhost/user/login', 'post', userApi.login)
Mock.mock('http://localhost/user/menuList', 'post', userApi.menuList)
Mock.mock('http://localhost/user/userList', 'post', userApi.userList)

export default Mock
