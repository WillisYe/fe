/**
 * vuex相关，现在主要用于用户信息、积分相关
  */
import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './modules/userinfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userinfo
    },
    strict: process.env.NODE_ENV !== 'production'
})