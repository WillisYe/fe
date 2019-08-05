let arr = [
    "单据号",
    "单据时间",
    "类型",
    "区划名称",
    "基层工会",
    "符合疗休养人数",
    "计划总人数",
    "计划总批次",
    "状态",
    "操作",
    "类型",
    "单据号",
    "单据日期",
    "区划名称",
    "基层工会",
    "符合疗休养人数",
    "计划总人数",
    "计划总批次",
    "市内人数",
    "省内人数",
    "周边省市人数",
    "对口支援人数",
    "二年并休人数",
    "三年并休人数",
    "单据号",
    "单据日期",
    "区划名称",
    "基层工会",
    "符合疗休养人数",
    "本季度计划人数",
    "本季度计划批次",
    "疗休养地域",
    "意向承办单位",
    "意向线路",
    "本线路人数",
    "备注",
    "单据号",
    "单据日期",
    "区划名称",
    "基层工会",
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
// console.log(JSON.stringify(quotas, null, 4))

export default {
    name: '出行计划',
    key: 'recu_trip',
    path: '/api/rest/trip',
    pathGetByPage: '/api/rest/trip/page',
    pathObsolete: `/api/rest/trip/obsolete`,
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
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        },
        {
            "name": "单据时间",
            "key": "createTime",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
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
            "name": "类型",
            "key": "status",
            "type": "select",
            "enum": "OrderStatusEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养地域",
            "key": "",
            "type": "select",
            "enum": "ItineraryTypeEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "承办单位",
            "key": "purposeTakerId",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }, {
            "name": "疗休养线路",
            "key": "purposeItineraryId",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "计划总人数",
            "key": "totalNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养日程",
            "key": "totalNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "工会联系人",
            "key": "totalNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "工会联系电话",
            "key": "totalNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
    ]
}