/**
 * vue管道，过滤器
 */
import utils from '@/utils'

// 时间戳转日期
const date = (tm, formater = 'yyyy-MM-dd') => {
    if (tm > 0) {
        return utils.dateFormat(tm, formater)
    } else {
        return tm
    }
}
// 数据格式化
const format = (val = '', type, formater = 'yyyy-MM-dd') => {
    // date-日期，percent:百分比，float:保留两位小数，sum金额，
    let result;
    let _val = +val;
    switch (type) {
        case 'date':
            if (val > 0) {
                if (val < 1e8) {
                    // 20180101数字型
                    val += '';
                    result = val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6)
                } else {
                    // 时间戳
                    result = utils.dateFormat(val, formater)
                }
            } else {
                // 未返回
                result = val
            }
            break;
        case 'int':
            result = isNaN(_val) || val === '' ? val : split3(parseInt(_val) + '');
            break;
        case 'float':
            result = isNaN(_val) || val === '' ? val : split3(_val.toFixed(2));
            break;
        case 'rrg':
            result = isNaN(_val) || val === '' ? val : split3(_val.toFixed(1));
            break;
        case 'percent':
            if (isNaN(_val) || val === ''){
                result = val;
            }else if (!Number.isFinite(val)){//判断数值无限大
                result = '0%';
            }
            else{
                result = _val.toFixed(2) + '%';
            }
            // result = isNaN(_val) || val === '' ? val : _val.toFixed(2) + '%';
            break;
        case 'sum':
            result = isNaN(_val) || val === '' ? val : '$' + split3(_val.toFixed(2));
            break;
        case 'json':
            result = ''
            if (val) {
                if (typeof val === 'string') {
                    return ''
                    try {
                        val = JSON.parse(val)
                        if (typeof val === 'string') {
                            return val
                        }
                    } catch (error) {
                        return val
                    }
                }
                for (let key in val) {
                    if (val.hasOwnProperty(key)) {
                        if (typeof val[key] === 'string') {
                            result += `${key}:${val[key]}; `
                        } else {
                            result += `${key}:${JSON.stringify(val[key]).replace(/\"/g, '').replace(/,/g, ', ')}; `
                        }
                    }
                }
            }
            break;
        default:
            val = +val || val;
            result = val.toLocaleString();
            break;
    }
    return result
}

function split3(numStr) {
    let numArr = numStr.split('.');
    numStr = (+numArr[0]).toLocaleString()
    if (numArr[1]) {
        numStr = numStr + '.' + numArr[1]
    }
    return numStr
}

export default {
    date,
    format
}