let arr = [
    "工会名称",
    "单位名称",
    "部门名称",
    "职工编号",
    "职工名称",
    "性别",
    "职务",
    "民族",
    "身份证号码",
    "手机号码",
    "政治面貌",
    "疗休养资格",
    "并休",
    "最近疗休养日期",
    "最近省外疗休养日期",
    "操作",
    "工会名称",
    "单位名称",
    "部门名称",
    "职工编号",
    "职工名称",
    "性别",
    "职务",
    "民族",
    "身份证号码",
    "手机号码",
    "政治面貌",
    "疗休养资格",
    "每年疗休养经费",
    "工会名称",
    "单位名称",
    "部门名称",
    "职工编号",
    "职工名称",
    "身份证号码",
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
    name: '职工',
    key: 'obj_member',
    path: '/api/obj/member',
    pathGetByPage: '/api/obj/member/page',
    pathObsolete: `/api/obj/member/obsolete`,
    pathExport: `/api/obj/member/export`,
    params: {},
    quotas: [{
            "name": "工会名称",
            "key": "unitName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "单位名称",
            "key": "baseName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "部门名称",
            "key": "deptName",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "职工编号",
            "key": "",
            "type": "string",
            "create": false,
            "update": false,
            "read": true,
            "filter": true
        },
        {
            "name": "职工名称",
            "key": "userCode",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "性别",
            "key": "sex",
            "type": "select",
            "enum": "SexEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "职务",
            "key": "station",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "民族",
            "key": "nation",
            "type": "select",
            "enum": "NationEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "身份证号码",
            "key": "idcard",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": true
        },
        {
            "name": "手机号码",
            "key": "phone",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "政治面貌",
            "key": "political",
            "type": "select",
            "enum": "PoliticalEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "疗休养资格",
            "key": "PoliticalEnum",
            "type": "select",
            "enum": "select",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "并休",
            "key": "mergeRest",
            "type": "select",
            "enum": "MergeRestEnum",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "最近疗休养日期",
            "key": "lastRestDate",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "最近省外疗休养日期",
            "key": "lastOutRestDate",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        },
        {
            "name": "每年疗休养经费",
            "key": "annualFee",
            "type": "string",
            "create": true,
            "update": true,
            "read": true,
            "filter": false
        }
    ]
}