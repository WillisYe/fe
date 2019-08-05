let arr = [
    "单据号",
    "单据时间",
    "区划名称",
    "基层工会",
    "承办单位",
    "疗休养地域",
    "疗休养线路",
    "疗休养日期",
    "疗休养人数",
    "状态",
    "操作",
    "出行计划单",
    "基层工会名称",
    "批次",
    "承办单位",
    "线路名称",
    "疗休养地域",
    "工会联系人",
    "附件",
    "计划人数",
    "疗休养日程",
    "工会联系电话",
    "疗休养备案单据号",
    "备案时间",
    "疗休养出行计划单据号",
    "区划名称",
    "基层工会",
    "状态",
]
arr = arr.filter(item => !'操作'.includes(item))
arr = [...new Set(arr)]
let quotas = arr.map(item => {
    return {
        name: item,
        key: '',
        type: 'string',
        create: true,
        update: true,
        read: true,
        filter: false
    }
})

// 创建接口需单独处理
export default {
    name: '疗休养备案',
    key: 'recu_year',
    path: '/api/rest/rcdtrippan',
    pathSubmit: '/api/rest/rcdtrippan/create',
    pathGetByPage: '/api/rest/rcdtrippan/page',
    pathObsolete: `/api/rest/rcdtrippan/obsolete`,
    // params: {
    //     unitType: 7
    // },
    quotas: [{
            "name": "区划名称",
            "key": "areaName",
            "type": "area",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "单据号",
            "key": "panNo",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "单据时间",
            "key": "createTime",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },

        {
            "name": "基层工会",
            "key": "unitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "承办单位",
            "key": "takerId",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养地域",
            "key": "itineraryType",
            "type": "select",
            "enum": "ItineraryTypeEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养线路",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养日期",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养人数",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "状态",
            "key": "status",
            "type": "select",
            "enum": "OrderStatusEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "出行计划单",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "批次",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "线路名称",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "工会联系人",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "附件",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "计划人数",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养日程",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "工会联系电话",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养备案单据号",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "备案时间",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养出行计划单据号",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }
    ]
}