/**
 * axios配置
 */
import Vue from 'vue'
import axios from "axios";
import router from '@/router/index'
import store from "@/store"
import qs from "qs";

// axios 配置 现代浏览器资源并发数为6，为防止请求阻塞，超时时间不宜设置过长
// axios.defaults.baseURL = 'http://sowin-gateway:9999/';
axios.defaults.timeout = 20 * 10 ** 3;
//设置全局的请求次数，请求的间隙
axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;
axios.defaults.headers.common['Cache-Control'] = 'max-age=180';
axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";

// axios.defaults.headers.common['Authorization'] = "Basic c293aW46c293aW4="; "Basic dGVzdDp0ZXN0";
let userinfo = sessionStorage.getItem("userinfo");
if (userinfo) {
    userinfo = JSON.parse(userinfo);
    axios.defaults.headers.common['Authorization'] = "Bearer " + userinfo.access_token;
}

let role = sessionStorage.getItem("role");
if (role) {
    role = JSON.parse(role);
    axios.defaults.headers.common['entrance'] = role.entrance;
    axios.defaults.headers.common['tenantId'] = role.tenantId;
}

function removeEmpty(data) {
    if (!data) return
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (
                [undefined, null, ""].includes(data[key])
            ) {
                delete data[key];
            }
        }
    }
}

// request 拦截器
axios.interceptors.request.use(
    config => {
        // post请求data转换
        // 删除空数据
        removeEmpty(config.data)
        removeEmpty(config.params)
        // formdata传参的url   
        let objUrls = ['/api/obj/member/transferPosition', '/api/obj/member/grantManager', '/api/obj/member/grantOperator', '/api/obj/itinerary/recommend', '/api/obj/itinerary/audit'];
        let restUrls = ['/api/rest/annualpan/publish']
        if ((!config.url.includes('/api/obj/') || objUrls.includes(config.url)) && !restUrls.includes(config.url)) {
            config.data = qs.stringify(config.data)
        }
        if (config.url.startsWith('/api')) {
            config.url = config.url.slice(4)
        }

        config.withCredentials = true;
        return config;
    }, error => {
        Message.error({
            message: error,
            showClose: true
        })
        Promise.reject(error);
    });

// response 拦截器
axios.interceptors.response.use(
    response => {
        console.log("axios res")
        if (['/auth/oauth/token'].includes(response.config.url) || response.config.url.endsWith('/export')) {
            // 登录接口返回数据结构特殊，导出接口返回数据为文本流
            return response;
        } else if (typeof response.data === 'object') {
            switch (response.data.code) {
                case 0:
                    window.responseRet = response.data.code;
                    return response;
                case 10:
                    window.responseRet = response.data.code;
                    sessionStorage.setItem('lastPath', router.history.current.path)
                    router.push('/login')
                    break;                
                case 13:
                    // 账号异常待处理
                    window.responseRet = response.data.code;
                    break;
                default:
                    window.responseRet = response.data.code;
                    return Promise.reject(response.data.msg);
            }
        }
    },
    err => {
        console.log("axios err")
        err.request = null;
        delete err.request;
        err.response = null;
        delete err.response;
        // config/code/request/response
        let config = err.config;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) {
            return Promise.reject(err)
        };
        // 请求超时处理
        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            return Promise.reject(err);
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        let backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, config.retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function() {
            return axios(config);
        });
    });

Vue.axios = axios
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
});

export default axios;