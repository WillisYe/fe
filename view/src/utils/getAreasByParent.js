// 获取公共枚举类型
import axios from "@/plugins/axios";

// 返回区划总表，接受id时查其上下级

// 反查区划上级 /area/upper/{areaCode}
function getAreaUpper(areaCode, fn) {
    axios
        .get(`/api/admin/area/upper/${areaCode}`)
        .then(res => {
            let area = res.data.data;
            fn(area)
        })
        .catch(err => {
            console.log(err);
        });
}

// 数据转换
function doAreas(data, end) {
    return Object.values(data).map(item => ({
        label: item.areaName,
        value: item.searchCode,
        level: item.areaLevel,
        children: end ? null : []
    }));
}

function getAreasByParentAjax(pid, level, fn) {
    axios
        .get(`/api/admin/pubsrv/areasByParent/${pid}`)
        .then(res => {
            let list = res.data.data;
            let areas = doAreas(list)
            fn(areas, pid)
            localStorage.setItem("areas", JSON.stringify(areas))
        })
        .catch(err => {
            console.log(err);
        });
}

export default function(id, level = -1, fn) {
    let areasLs = localStorage.getItem('areas')
    if (areasLs) {
        let areas = JSON.parse(areasLs)
        let list = areas.flat(Infinity);
        let item = list.find(item => item.value === id)
        if (item) {
            if (item.level < 4 && item.children && item.children.length) {
                getAreasByParentAjax(id, level, fn)
            }
        } else {
            getAreaUpper(id, (area) => {
                // 递归逻辑应该放到getAreaUpper函数中
                // searchCode parentCode
                switch (area.areaLevel) {
                    case 4:
                        let temp1 = list.find(item => item.value === area.searchCode)
                        let temp2 = list.find(item => item.value === area.parentCode)
                        if (temp1) {
                            
                        } else {
                            if (temp2) {
                                getAreaUpper(area.parentCode, () => {
                                    
                                })
                            }
                        }
                        
                        break;
                    case 3:

                        break;
                    case 2:

                        break;
                    case 1:

                        break;
                    case 0:

                        break;
                    default:
                        break;
                }
            })
        }
    } else {
        getAreasByParentAjax('000000000000')
    }

}