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
    name: '年度计划',
    key: 'recu_year',
    path: '/api/rest/annualpan',
    pathSubmit: '/api/rest/annualpan/publish',
    pathGetByPage: '/api/rest/annualpan/page',
    pathObsolete: `/api/rest/annualpan/obsolete`,
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
            "name": "基层工会",
            "key": "unitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "符合疗休养人数",
            "key": "allowNum",
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
            "name": "计划总批次",
            "key": "totalBatch",
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
            "name": "市内人数",
            "key": "inCityNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "省内人数",
            "key": "inProvNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "周边省市人数",
            "key": "nbProvNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "对口支援人数",
            "key": "assistNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "二年并休人数",
            "key": "merge2Num",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "三年并休人数",
            "key": "merge3Num",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "本季度计划人数",
            "key": "completedNum",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "本季度计划批次",
            "key": "completedBatch",
            "type": "string",
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
            "name": "意向承办单位",
            "key": "purposeTakerId",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "意向线路",
            "key": "purposeItineraryId",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "本线路人数",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "备注",
            "key": "meno",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }
    ]
}