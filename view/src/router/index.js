/**
 * 
 */
import Vue from 'vue'
import Router from 'vue-router'
import c404 from '@/pages/sys/404.vue'
import credirect from '@/pages/sys/redirect.vue'
import clogin from '@/pages/sys/login.vue'

import tabs from "@/pages/tabs"
import nation from "@/pages/tabs/nation"
import tips from "@/pages/tabs/tips"
import hero from "@/pages/tabs/hero"
import prop from "@/pages/tabs/prop"
import creeps from "@/pages/tabs/creeps"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '*',
            component: c404,
            meta: {
                title: ['404']
            }
        },
        {
            path: '/',
            component: credirect,
        },
        // 用户相关
        {
            path: '/login',
            component: clogin,
            meta: {
                title: ['登录']
            }
        },
        {
            path: '/tabs',
            component: tabs,
            name: '',
            children: [{
                    "path": "/nation",
                    "component": nation
                },
                {
                    "path": "/tips",
                    "component": tips
                },
                {
                    "path": "/hero",
                    "component": hero
                },
                {
                    "path": "/prop",
                    "component": prop
                },
                {
                    "path": "/creeps",
                    "component": creeps
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        // 配合服务器端解决刷新404bug        
        next(to.query.to || '/tabs')
    } else {
        next()
    }
})
export default router