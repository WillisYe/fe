# myweb

> 基于 vue-cli3 + Vue.js 2.x+vuex+vueRouter + Element UI + Echarts

## 目录结构
```shell
├── dist                       // 打包后生成代码目录
├── node_modules               // 前端依赖包目录
├── public                     // index.html,静态资源目录
├── src                        // 开发目录源代码
│   ├── components             // 全局公用组件
│   ├── config                 // 项目配置
│   ├── pages                  // 页面
│   ├── plugins                // 项目插件
│   ├── router                 // 路由相关
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── App.vue                // 入口页面
│   ├── base.scss              // scss样式公用部分
│   ├── element-variables      // element样式变量设置
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源文件
├── bable.config.js            // babel-loader 配置
├── package.json               // 项目依赖管理
├── README.md                  // 说明
└── vue.config.js              // webpack配置相关

```

## 技术栈
- "vue": "^2.6.10",
- "vuex": "^3.1.1",
- "vue-router": "^3.0.6",
- "qs": "^6.7.0",
- "axios": "^0.19.0",
- "countup": "^1.8.2",
- "core-js": "^2.6.5",
- "echarts": "^4.2.1",
- "vue-echarts": "^4.0.3",        
- "spacetime": "^5.9.0",
- "element-ui": "2.8.2",
- "babel-loader": "^8.0.6",
- "babel-polyfill": "^6.26.0"

### UI
用element-ui实现界面的排版

### 数据可视化
用vue-echarts实现数据可视化，如项目中折线图柱状图的展示

## 安装步骤 ##		
安装项目依赖，npm i / yarn
	
## 本地开发 ##
开启服务，浏览器访问  
npm run serve / yarn serve
	
## 构建生产 ##
执行构建命令，生成的dist文件夹放在服务器下即可访问  
npm run build	 / yarn build

## 生成APP icon splash ##
png图片放在 "resources\android"目录下
ionic cordova resources android

## 打包生成APP ##
ionic cordova platform add android
ionic cordova build android