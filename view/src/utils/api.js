/** 
 * 共用接口
 */
import Vue from 'vue'
/**
 * 更改评论问题类型，或关闭恢复评论
 * data_type: 1 订单备注   2 评论备注
 * rcid: 传评论rcid
 * asin: 产品asin
 * oid 订单oid
 * set_type: 设置类型，state时type-1关闭，其他恢复；type时通过type更改问题类型
 * type: 问题类型或者订单关闭开启状态
 */
export function reviewFn(data = {}) {
    return Vue.axios.post('amazonPw/remark/setType', data);
}

/**
 * 添加监控
 * @returns {*|Promise.<TResult>}
 */
export function setMonitor(data = {}) {
    return Vue.axios.post('lookBoard/setMonitor/index', data);
}

/**
 * 取消监控
 * @returns {*|Promise.<TResult>}
 */
export function delMonitor(data = {}) {
    return Vue.axios.post('lookBoard/setMonitor/delInfos', data);
}

/**
 * 登录
 * @returns {*|Promise.<TResult>}
 */
export function login(params = {}) {
    return Vue.axios.post('AccountUser/login', params);
}

/**
 * 获取用户信息
 * @returns {*|Promise.<TResult>}
 */
export function getAccountInfo(params = {}) {
    return Vue.axios.get('AccountUser/getAccountInfo', {
        params
    });
}

/**
 * 获取积分使用情况
 * @returns {*|Promise.<TResult>}
 */
export function getScoreList(params = {}) {
    return Vue.axios.get('AccountScore/Score/getScoreList', {
        params
    });
}