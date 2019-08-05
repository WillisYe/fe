let arr = [
    "区划名称",
    "工会名称",
    "单位编码",
    "单位名称",
    "单位类型",
    "社会信用统一代码",
    "单位地址",
    "联系人",
    "联系电话",
    "部门列表",
    "状态",
    "操作",
    "行政单位分类",
    "所属工会",
    "单位编码",
    "单位名称",
    "单位类型",
    "社会信用统一代码",
    "单位地址",
    "联系人",
    "联系电话",
    "部门列表",
    "状态",
    "区划名称",
    "工会名称",
    "单位编码",
    "单位名称",
    "单位类型",
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
// console.log(JSON.stringify(quotas, null, 4))

export default {
    name: '行政单位',
    key: 'obj_adminunit',
    path: '/api/obj/unit',
    pathGetByPage: '/api/obj/unit/page',
    pathObsolete: `/api/obj/unit/obsolete`,
    pathExport: `/api/obj/unit/export`,
    params: {
        unitType: 5
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
            "name": "工会名称",
            "key": "upperUnitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "单位编码",
            "key": "unitCode",
            "type": "string",
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        },
        {
            "name": "单位名称",
            "key": "unitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "单位类型",
            "key": "deptTypes",
            "type": "select",
            "enum": "DeptTypeEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "行政单位分类",
            "key": "unitNature",
            "type": "select",
            "enum": "UnitNatureEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "社会信用统一代码",
            "key": "organCert",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "单位地址",
            "key": "address",
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
        },
        {
            "name": "联系电话",
            "key": "contactPhone",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
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
            "name": "部门列表",
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
            "enum": "ObjectStatusEnum",
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        }        
    ]
}