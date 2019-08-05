let arr = [
    "区划名称",
    "工会编码",
    "工会名称",
    "工会类型",
    "上级工会",
    "下属单位",
    "主席",
    "联系人",
    "状态",
    "操作",
    "区划名称",
    "工会编码",
    "工会名称",
    "工会类型",
    "上级工会",
    "下属单位",
    "主席",
    "联系人",
    "行政区划",
    "社会统一信用代码",
    "工会编码",
    "工会名称",
    "工会类型",
    "上级工会",
    "负责人",
    "联系人",
    "联系电话",
    "工会地址",
    "工会",
    "区划名称",
    "工会编码",
    "工会名称",
    "工会类型",
    "上级工会",
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

export default {
    name: '工会',
    key: 'obj_laborunit',
    path: '/api/obj/unit',
    pathGetByPage: '/api/obj/unit/page',
    pathObsolete: `/api/obj/unit/obsolete`,
    pathExport: `/api/obj/unit/export`,
    params: {
        unitType: 1
    },
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
            "name": "工会编码",
            "key": "unitCode",
            "type": "string",
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        },
        {
            "name": "工会名称",
            "key": "unitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "工会类型",
            "key": "deptTypes",
            "type": "selects",
            "enum": "DeptTypeEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "上级工会",
            "key": "upperUnitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "下属单位",
            "key": "",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "联系人",
            "key": "contactName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }, {
            "name": "联系电话",
            "key": "contactPhone",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }, {
            "name": "负责人",
            "key": "leaderName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }, {
            "name": "负责人电话",
            "key": "leaderPhone",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "社会统一信用代码",
            "key": "organCert",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },        
        {
            "name": "工会地址",
            "key": "address",
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
            "enum": "ObjectStatusEnum",
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        }
    ]
}