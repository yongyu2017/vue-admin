# About

此项目是由 Vue + Element-ui 构建的后台管理系统，具有登陆、全局状态管理、权限管理等功能。

## 技术栈

Vue2 + Vuex + Vue-router + Axios + Element-ui

## 项目运行

```
npm install

npm run serve（开发）

npm run build（生产）

访问: http://localhost:8002

```
## 备注

#### 1.注意项目安装node-sass（v6.0.1）、sass-loader（10.2.1）依赖包时，node.js运行环境为v16.18.1；
#### 2.node-sass安装失败时，可以使用taobao镜像；
```
2.1 采用taobao的镜像地址，进入cmd之后输入：
npm config set registry https://registry.npm.taobao.org 
2.2 查看是否安装成功：
npm config get registry 
```