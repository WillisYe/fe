// vue插件引入，插件配置主要在plugins目录
import Vue from 'vue'
import App from '@/App'
import store from "@/store"
import router from '@/router/index'

import './plugins/index.js'
import './plugins/axios.js'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false
// 关闭vue警告
Vue.config.silent = true

/* eslint-disable no-new */
let APP = new Vue({
    store,
    router,
    render: h => h(App),
    data() {
        return {}
    },
    methods: {},
}).$mount('#app')