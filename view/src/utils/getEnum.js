// 获取公共枚举类型

import axios from "@/plugins/axios";

let enums = {
    "BizEnums": {
        "新闻类别": "NewsTypeEnum",
        "单据状态": "OrderStatusEnum",
        "界面入口": "EntranceEnum",
        "并休状态": "MergeRestEnum",
        "线路类型": "QuestTypeEnum",
        "职工性质": "MemberNatureEnum",
        "资讯类型": "InformationTypeEnum",
        "疗休养地域": "ItineraryTypeEnum",
        "疗休养点等级": "RestGradeEnum",
        "属性类型": "AttrTypeEnum",
        "单位性质": "UnitNatureEnum",
        "性别": "SexEnum",
        "消息对象": "MsgTargetEnum",
        "单位类型": "UnitTypeEnum",
        "民族": "NationEnum",
        "疗休养点类型": "RestTypeEnum",
        "政治面貌": "PoliticalEnum",
        "通过对象状态": "ObjectStatusEnum",
        "组织类型": "DeptTypeEnum",
        "用户类型": "UserTypeEnum"
    },
    "NewsTypeEnum": {
        "1": "政策文件",
        "2": "消息通知",
        "3": "知识学习",
        "4": "新闻",
        "5": "其他"
    },
    "OrderStatusEnum": {
        "0": "初始",
        "1": "起草",
        "2": "待审核",
        "3": "发布",
        "4": "完成",
        "5": "下架",
        "9": "作废"
    },
    "EntranceEnum": {
        "0": "系统管理中心",
        "1": "商城",
        "2": "个人中心",
        "3": "总工会主席-管理中心",
        "4": "总工会服务中心-管理中心",
        "5": "基层工会-管理中心",
        "6": "行政单位-管理中心",
        "7": "承办单位-管理中心"
    },
    "MergeRestEnum": {
        "0": "无",
        "2": "两年",
        "3": "三年"
    },
    "QuestTypeEnum": {},
    "InformationTypeEnum": {
        "1": "政策信息",
        "2": "相关通知",
        "3": "活动信息"
    },
    "ItineraryTypeEnum": {
        "1": "市内",
        "2": "省内",
        "3": "周边五省市",
        "4": "对口支援省市"
    },
    "RestGradeEnum": {},
    "AttrTypeEnum": {
        "1": "属性类型",
        "2": "文本",
        "3": "文本域",
        "4": "布尔",
        "5": "单选",
        "6": "多选",
        "7": "选项"
    },
    "UnitNatureEnum": {
        "1": "机关",
        "2": "事业",
        "3": "企业",
        "4": "民间组织",
        "5": "军队",
        "9": "其他",
        "21": "全额拨款事业",
        "22": "差额拨款事业",
        "23": "自收自支事业",
        "31": "国有企业",
        "32": "非国有企业",
        "41": "社会团体",
        "42": "民办非企业"
    },
    "SexEnum": {
        "0": "未知",
        "1": "男",
        "2": "女",
        "9": "未说明"
    },
    "MsgTargetEnum": {},
    "UnitTypeEnum": {
        "1": "工会系统",
        "5": "行政单位",
        "6": "部门",
        "7": "旅行社",
        "8": "疗休养基地",
        "9": "疗休养点"
    },
    "NationEnum": {
        "1": "汉族",
        "2": "蒙古族",
        "3": "回族",
        "4": "藏族",
        "5": "维吾尔族",
        "6": "苗族",
        "7": "彝族",
        "8": "壮族",
        "9": "布依族",
        "10": "朝鲜族",
        "11": "满族",
        "12": "侗族",
        "13": "瑶族",
        "14": "白族",
        "15": "土家族",
        "16": "哈尼族",
        "17": "哈萨克族",
        "18": "傣族",
        "19": "黎族",
        "20": "傈僳族",
        "21": "佤族",
        "22": "畲族",
        "23": "高山族",
        "24": "拉祜族",
        "25": "水族",
        "26": "东乡族",
        "27": "纳西族",
        "28": "景颇族",
        "29": "柯尔克孜族",
        "30": "土族",
        "31": "达斡尔族",
        "32": "仫佬族",
        "33": "羌族",
        "34": "布朗族",
        "35": "撤拉族",
        "36": "毛难族",
        "37": "仡佬族",
        "38": "锡伯族",
        "39": "阿昌族",
        "40": "普米族",
        "41": "塔吉克族",
        "42": "怒族",
        "43": "乌孜别克族",
        "44": "俄罗斯族",
        "45": "鄂温克族",
        "46": "德昂族",
        "47": "保安族",
        "48": "裕固族",
        "49": "京族",
        "50": "塔塔尔族",
        "51": "独龙族",
        "52": "鄂伦春族",
        "53": "赫哲族",
        "54": "门巴族",
        "55": "珞巴族",
        "56": "基诺族",
        "97": "其他",
        "98": "外国血统中国籍人士"
    },
    "RestTypeEnum": {},
    "PoliticalEnum": {
        "1": "中国共产党党员",
        "2": "中国共产党预备党员",
        "3": "中国共产主义青年团团员",
        "4": "中国国民党革命委员会会员",
        "5": "中国民主同盟盟员",
        "6": "中国民主建国会会员",
        "7": "中国民主促进会会员",
        "8": "中国农工民主党党员",
        "9": "中国致公党党员",
        "10": "九三学社社员",
        "11": "台湾民主自治同盟盟员",
        "12": "无党派民主人士",
        "13": "群众"
    },
    "ObjectStatusEnum": {
        "0": "初始",
        "1": "分配",
        "2": "正常",
        "3": "冻结",
        "9": "作废"
    },
    "DeptTypeEnum": {
        "1": "总工会",
        "2": "系统工委",
        "3": "产业工会",
        "4": "基层工会",
        "5": "行政单位",
        "6": "部门",
        "7": "旅行社",
        "8": "疗休养基地",
        "9": "疗休养点"
    },
    "UserTypeEnum": {},
    "MemberNatureEnum": {
        "1": "公务员",
        "2": "工勤",
        "3": "事业",
        "4": "国企",
        "5": "合同",
        "6": "其他"
    },
}


// getEnumsAjax("BizEnums", (res, type) => {
//     for (let key in res) {
//         if (res.hasOwnProperty(key)) {
//             if (Object.keys(enums[res[key]]).length === 0) {
//                 getEnumsAjax(res[key], (list, t) => {
//                     enums[t] = list;
//                     console.log(JSON.stringify(enums, null, 4))
//                 })
//             }
//         }
//     }
// })


function getEnumsAjax(type, fn) {
    axios
        .get(`/api/admin/pubsrv/enums/${type}`)
        .then(res => {
            let list = res.data.data;
            fn(list, type, enums)
            enums[type] = list;
            localStorage.setItem("enums", JSON.stringify(enums))
        })
        .catch(err => {
            console.log(err);
        });
}

export default function(type, fn) {
    let enumsLs = localStorage.getItem('enums')
    if (enumsLs) {
        enums = JSON.parse(enumsLs)
        if (enums[type] && Object.keys(enums[type]).length) {
            fn(enums[type], type, enums)
        } else {
            getEnumsAjax(type, fn)
        }
    } else {
        getEnumsAjax(type, fn)
    }

}