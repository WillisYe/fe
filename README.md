# 魔兽争霸

## 项目简介

魔兽争霸相关资料

## 项目截图

**私人出行**
![](https://www.ali213.net/picfile/News/2010/07/28/100.jpg)
![](https://www.ali213.net/picfile/News/2010/07/28/100.jpg)

## 技术栈

- **前端**：移动端，vue全家桶，mint-ui组件库，Echarts.js，Scss

- **后端**：Node，Express框架，crawler
- **数据库**：Mysql

## 项目构建
### 前端
前端在`vue-cli3`基础上开发，在此之上根据项目需求对项目工程作出几点修改，前端代码在`view/`文件夹中 

- **移动端适配**：之前做移动端开发一直使用[手淘的分辨率适配方案](https://www.w3cplus.com/css/vw-for-layout.html)，本项目根据大漠的[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)，对移动端分辨率用webpack在工程中配置。

- **请求拦截器**：在`view/src/request/`中，基于`axios`提供的`interceptors`对所有ajax的请求和响应添加相应操作，如请求头添加，token添加，响应后台错误状态码的识别与报错；简单封装了下axios请求，主要为get，post两种。

- **导航守卫**：在`view/src/router/`中，做了全局导航守卫，未登录用户只能访问项目登录页面。

- **工具类**：在`view/src/utils/`中，对常用枚举值、全局组件注册、常用类封装等功能做模块化封装。

- **css样式**：在`view/src/style/`中，全局公共样式，初始化样式。

- **svg组件**：在`view/src/icons/`中，封装用于svg展示组件，用做小icon的展示，svg保存该文件夹中。

- **模块化**：对路由与vuex做模块化封装。

- **地图**：所有地图、地理信息、轨迹、路线规划功能有**高德地图**第三方API提供

### 后端
- 使用`Node`的`express`框架，连接`Mysql`数据库，做数据接口开发，数据的增删改查与简单封装。

## 项目运行

``` bash
# 克隆项目
git clone https://github.com/WillisYe/fe.git

# 分别进入view/，server/文件夹分别下载依赖
cd view/server/node

npm install

# 导入mysql数据库表

# view下前端项目 打开端口localhost:8080
npm run serve

# serve下运行后端项目（必须先导入数据库表）
DEBUG=myapp:* npm start

# 前端项目打包
npm run build

```

作者 [[叶伟\]](https://github.com/WillisYe/)    

2019 年 8月 6日 