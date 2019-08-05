// 获取公共枚举类型
import axios from "@/plugins/axios";

// 职工
// obj_member_edit
// obj_member_curd

// 工会
// obj_laborunit_edit
// obj_laborunit_curd

// 行政单位
// obj_adminunit_edit
// obj_adminunit_curd

// 旅行社
// obj_travel_edit
// obj_travel_curd

// 疗休养基地
// obj_restbase_edit
// obj_restbase_curd

// 线路
// cot_action_view
// obj_itinerary_edit
// obj_itinerary_audit
// obj_itinerary_curd

// 活动资讯
// cot_action_edit
// cot_action_view
// cot_action_curd

// 年度计划
// recu_year_view
// recu_year_curd
// recu_year_edit

// 出行计划
// recu_trip_view
// recu_trip_curd
// recu_trip_edit
// recu_trip_audit

// 拼团报名
// recu_group_view
// recu_group_curd
// recu_group_edit
// recu_group_audit

// 疗休养备案
// recu_record_view
// recu_record_curd
// recu_record_edit
// recu_record_audit



function getPermsAjax(fn) {
    let roleLs = sessionStorage.getItem('role')
    let role = JSON.parse(roleLs)
    axios
        .get(`/api/admin/menu/perms/${role.roleId}`)
        .then(res => {
            let list = res.data.data;
            fn(list)
            localStorage.setItem("perms", JSON.stringify(list))
        })
        .catch(err => {
            console.log(err);
        });
}

export default function(fn) {
    let permsLs = localStorage.getItem('perms')
    if (permsLs) {
        let perms = JSON.parse(permsLs)
        fn(perms)
    } else {
        getPermsAjax(fn)
    }

}