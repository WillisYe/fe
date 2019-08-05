/**
 * 用户信息，积分相关
  */
import Vue from 'vue'
import * as API from "@/utils/api";

// initial state
const state = {
    uid: '',
    email: '',
    mobile: '',
    state: '',
    score: '',
    return_score: '',
    ad_state: '',
    mws_state: '',
    ad_url: '',
    meal_type: '',
    meal_surplus_day: '',
}

// getters
const getters = {
    score: state => state.score
}

// mutations
const mutations = {
    setuser(state, {
        key,
        value,
        reset
    }) {
        if (key) {
            Vue.set(state, key, value)
        } else {
            let keys = [...Object.keys(state), ...Object.keys(value)];
            keys.map(k => {
                if (k in value) {
                    Vue.set(state, k, value[k])
                } else {
                    if (reset) {
                        Vue.delete(state, k)
                    }
                }
            })
        }
        localStorage.setItem('userinfo', JSON.stringify(state))
    },
}

// actions
const actions = {
    login({
        commit
    }, {
        params,
        scb,
        ecb
    }) {
        API.login(params).then(res => {
            commit('setuser', {
                reset: true,
                value: res.data.data
            });
            scb && scb(res)
        }).catch(e => {
            ecb && ecb()
        });
    },
    getAccountInfo({
        commit
    }, {
        params,
        scb,
        ecb
    }) {
        API.getAccountInfo(params)
            .then(res => {
                commit('setuser', {
                    reset: false,
                    value: res.data.data
                })
                scb && scb(res)
            }).catch(e => {
                ecb && ecb()
            });
    },
    getScoreList({
        commit
    }, {
        params,
        scb,
        ecb
    }) {
        API.getScoreList(params)
            .then(res => {
                commit('setuser', {
                    key: 'score',
                    value: res.data.data.score
                })
                scb && scb(res)
            }).catch(e => {
                ecb && ecb()
            });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}