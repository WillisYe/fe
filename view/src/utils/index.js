/**
 * 公用方法
  */
import moment from 'spacetime';
let utils = {
    // 列表页面配置
    page: {
        size: 25,
        pageSizes: [25, 50, 75, 100],
        pageCount: 5,
        layout: 'total, sizes, prev, pager, next'
    },
    // 列表请求参数过滤
    paramsFilter(params) {
        let _params = JSON.parse(JSON.stringify(params))
        delete _params.pageSizes
        delete _params.count
        delete _params.layout
        for (let key in _params) {
            if (_params.hasOwnProperty(key)) {
                if (_params[key] === '') {
                    delete _params[key]
                }
            }
        }
        if (_params.filter) {
            _params.filterAdSum = {}
            for (let key in _params.filter) {
                if (_params.filter.hasOwnProperty(key)) {
                    if (key.startsWith('ad_') || key === 'kt') {
                        let item = _params.filter[key]
                        if (item.op && item.val !== undefined) {
                            _params.filterAdSum[key] = item
                        }
                        delete _params.filter[key]
                    }
                    if (_params.filter[key] === '') {
                        delete _params.filter[key];
                    }
                }
            }
        }
        if (_params.sizer === 'pg') {
            delete _params.filterAdSum
        }
        if (_params.sizer === 'druid') {
            delete _params.filter
        }
        return _params
    },
    // 日期时间格式化
    dateFormat(mydate, format = "yyyyMMdd") {
        if (typeof(mydate) !== 'object') {
            mydate = mydate >= 1e11 ? mydate : mydate * 1000
            mydate = new Date(mydate);
        }
        return moment(mydate)
            .goto("America/Los_Angeles")
            .format(format)
    },
    // 字符串类型日期格式化
    dateStr(date) {
        date = '' + date;
        let r = date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6);
        return r;
    },
    // 获取中英文混合字符串长度
    strLen(sString) {
        let j = 0;
        sString += ''
        let s = sString.trim();
        if (s === "") return j;
        for (let i = 0; i < s.length; i++) {
            if (s.substr(i, 1).charCodeAt(0) > 255) j = j + 2;
            else j++
        }
        return j;
    },    
    // 深克隆
    extendDeep(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    // 获取新旧对象变化属性
    getContrastData(oo, no) {
        let data = {};
        for (let key in no) {
            if (no.hasOwnProperty(key)) {
                let nv = no[key];
                let ov = oo[key];
                switch (true) {
                    case typeof nv === typeof ov:
                        if (typeof nv === "object") {
                            if (JSON.stringify(nv) !== JSON.stringify(ov)) {
                                data[key] = nv;
                            }
                        } else {
                            if (no[key] !== oo[key]) {
                                data[key] = nv;
                            }
                        }
                        break;
                    default:
                        data[key] = no[key];
                        break;
                }
            }
        }
        return data;
    },
    // 数值处理，将小数四舍五入只保留两位数
    getNum(num, n = 2) {
        if (typeof num === 'number' && parseInt(num) !== num) {
            num = num.toFixed(n)
        }
        return num;
    },
    unescape(str) {
        let elem = document.createElement('div')
        elem.innerHTML = str
        return elem.innerText || elem.textContent
    },
    // 数据类型
    getDataType(data) {
        return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    }
}

export default utils;