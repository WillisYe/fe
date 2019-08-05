/**
 * vue插件引入
  */
import Vue from 'vue'

import moment from 'spacetime';
Object.defineProperty(Vue.prototype, '$moment', {
    value: moment
});

// import zuiDropdown from "@/components/common/zuiDropdown"
// Vue.component('zuiDropdown', zuiDropdown)

// import ECharts from "vue-echarts/components/ECharts.vue";
import ECharts from "vue-echarts";
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/dataZoom';
Vue.component('EChart', ECharts)

import filters from "@/utils/filters"
import directives from "@/utils/directives"
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})