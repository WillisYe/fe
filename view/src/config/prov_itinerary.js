let arr = [
    "区划名称",
    "承办单位",
    "线路名称",
    "疗休养地域",
    "状态",
    "操作",
    "线路名称",
    "目的地",
    "线路主题",
    "疗休养地域",
    "线路交通",
    "出发城市",
    "行程天数",
    "原价",
    "折扣价",
    "缩略图",
    "轮换图",
    "费用说明",
    "重要提示",
    "行程安排",
    "线路介绍",
    "景区介绍",
    "区划名称",
    "承办单位",
    "线路名称",
    "疗休养地域",
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
        read: false,
        filter: false
    }
})

export default {
    name: '疗休养线路',
    key: 'obj_itinerary',
    path: '/api/obj/itinerary',
    pathGetByPage: '/api/obj/itinerary/page',
    pathObsolete: `/api/obj/itinerary/obsolete`,
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
            "name": "承办单位",
            "key": "takerName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "线路名称",
            "key": "itineraryName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "疗休养地域",
            "key": "itineraryType",
            "type": "select",
            "enum": "ItineraryTypeEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "目的地",
            "key": "target",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "线路主题",
            "key": "theme",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "线路交通",
            "key": "trafficTypeStr",
            "type": "string",
            "enum": "QuestTypeEnum",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "出发城市",
            "key": "departCity",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "行程天数",
            "key": "travelDays",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "原价",
            "key": "price",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "折扣价",
            "key": "discountPrice",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "缩略图",
            "key": "sketch",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "轮换图",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "费用说明",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "重要提示",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "行程安排",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "线路介绍",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
            "filter": false
        },
        {
            "name": "景区介绍",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": false,
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
            "filter": true
        },
    ]
}