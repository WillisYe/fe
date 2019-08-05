let arr = [
    "行政区划",
    "旅行社编码",
    "旅行社名称",
    "承办单位",
    "可承办区划",
    "负责人",
    "负责人电话",
    "操作",
    "行政区划",
    "旅行社编码",
    "旅行社名称",
    "统一社会信用代码",
    "承办单位",
    "可承办区划",
    "负责人",
    "负责人电话",
    "单位地址",
    "介绍",
    "行政区划",
    "旅行社编码",
    "旅行社名称",
    "承办单位",
    "可承办区划",
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
    name: '旅行社',
    key: 'obj_travel',
    path: '/api/obj/provider',
    pathGetByPage: '/api/obj/provider/page',    
    pathObsolete: `/api/obj/unit/obsolete`,
    pathExport: `/api/obj/provider/export`,
    params: {
        unitType: 7
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
            "name": "旅行社编码",
            "key": "unitCode",
            "type": "string",
            create: false,
            update: false,
            read: true,
            filter: true
        },
        {
            "name": "旅行社名称",
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