let arr = [
    '行政区划',
    '疗休养基地编码',
    '疗休养基地名称',
    '承办单位',
    '可承办区划',
    '负责人',
    '负责人电话',
    '操作',
    '行政区划',
    '疗休养基地编码',
    '疗休养基地名称',
    '统一社会信用代码',
    '承办单位',
    '可承办区划',
    '负责人',
    '负责人电话',
    '单位地址',
    '疗休养基地类型',
    '评级',
    '折扣',
    '住宿折扣',
    '餐饮折扣',
    '接待人数',
    '餐位',
    '停车位',
    '住宿',
    '人均消费',
    '周边景点',
    '特色推荐',
    '缩略图片',
    '轮换图',
    '重要提示',
    '交通指南',
    '介绍',
    '行政区划',
    '疗休养基地编码',
    '疗休养基地名称',
    '承办单位',
    '可承办区划'
]
arr = arr.filter(item => !'操作'.includes(item))
arr = [...new Set(arr)]
let quotas = arr.map(item => {
    return {
        name: item,
        key: '',
        type: 'string'
    }
})


export default {
    name: '疗休养基地',
    key: 'obj_restbase',
    path: '/api/obj/provider',
    pathGetByPage: '/api/obj/provider/page',    
    pathObsolete: `/api/obj/unit/obsolete`,
    pathExport: `/api/obj/provider/export`,    
    params: {
        unitType: 8
    },
    quotas: [{
            "name": "行政区划",
            "key": "areaName",
            "type": "area",
            create: true,
            update: true,
            read: true,
            filter: true
        },
        {
            "name": "疗休养基地编码",
            "key": "unitCode",
            "type": "string",
            create: false,
            update: false,
            read: true,
            filter: true
        },
        {
            "name": "疗休养基地名称",
            "key": "unitName",
            "type": "string",
            create: true,
            update: true,
            read: true,
            filter: true
        },
        {
            "name": "是否承办单位",
            "key": "isTaker",
            "type": "bool",
            create: true,
            update: true,
            read: true,
            filter: true
        },
        {
            "name": "可承办区划",
            "key": "takeAreaName",
            "type": "string",
            create: true,
            update: true,
            read: true,
            filter: true
        },
        {
            "name": "负责人",
            "key": "leaderName",
            "type": "string",
            create: true,
            update: true,
            read: true,
            filter: false
        },
        {
            "name": "负责人电话",
            "key": "leaderPhone",
            "type": "string",
            create: true,
            update: true,
            read: true,
            filter: false
        },
        {
            "name": "统一社会信用代码",
            "key": "organCert",
            "type": "string",
            create: true,
            update: true,
            read: false,
            filter: false
        },
        {
            "name": "单位地址",
            "key": "address",
            "type": "string",
            create: true,
            update: true,
            read: false,
            filter: false
        },
        {
            "name": "疗休养基地类型",
            "key": "unitType",
            "type": "select",
            enum: "RestTypeEnum",
            create: true,
            update: true,
            read: false,
            filter: false
        },
        {
            "name": "评级",
            "key": "estimateGrade",
            "type": "select",
            enum: 'RestGradeEnum',
            create: true,
            update: true,
            read: false,
            filter: false
        },
        {
            "name": "折扣",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "住宿折扣",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "餐饮折扣",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "接待人数",
            "key": "consumerNum",
            "type": "string",
            create: true,
            update: true,
            read: false,
            filter: false
        },
        {
            "name": "餐位",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "停车位",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "住宿",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "人均消费",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "周边景点",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "特色推荐",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "缩略图片",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "轮换图",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "重要提示",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "交通指南",
            "key": "",
            "type": "string",
            create: false,
            update: false,
            read: false,
            filter: false
        },
        {
            "name": "介绍",
            "key": "memo",
            "type": "string",
            create: true,
            update: true,
            read: false,
            filter: false
        }
    ]
}