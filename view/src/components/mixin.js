import ResultHead from "@/components/common/result-head";
import XwPage from "@/components/common/xw-page";
import XwFormCheck from "@/components/common/xw-form-check";
import XwFormAdd from "@/components/common/xw-form-add";
import XwTableItems from "@/components/common/xw-table-items";
import getAreasByParent from "@/utils/getAreasByParent";
import getEnum from "@/utils/getEnum";
export default {
    components: {
        ResultHead,
        XwPage,
        XwFormCheck,
        XwFormAdd,
        XwTableItems,
    },
    data() {
        return {
            formData: {},
            page: {
                sizes: [15, 30, 50, 100],
                size: 15,
                layout: "slot, sizes, prev, pager, next"
            },
            result: {
                current: 1,
                pages: 1,
                records: [],
                size: 10,
                total: 0
            },
            areas: [],
            provinces: [],
            cities: [],
            counties: [],
            enums: {},
            // 单位性质UnitNatureEnum
            UnitNatureEnum: {},
            // 单位分类DeptTypeEnum
            DeptTypeEnum: {},
            // 状态列表
            ObjectStatusEnum: {},
            // 新增、编辑弹窗
            dialogForm: {
                title: "新增工会",
                visible: false,
                disabled: false,
                data: {}
            }
        };
    },
    methods: {
        // 初始化区划下拉框 省市暂时限定在台州市        
        getAreaList(fn, params = ["330000000000", "331000000000", "331002000000"]) {
            Promise.all([
                    this.$http.get(`/api/admin/pubsrv/areasByParent/000000000000`),
                    this.$http.get(`/api/admin/pubsrv/areasByParent/${params[0]}`),
                    this.$http.get(`/api/admin/pubsrv/areasByParent/${params[1]}`)
                ])
                .then(ress => {
                    let provinces = this.doAreas(ress[0].data.data);
                    let cities = this.doAreas(ress[1].data.data);
                    let counties = this.doAreas(ress[2].data.data, true);
                    let city = cities.find(item => item.value === params[1]);
                    city.children = counties;
                    let province = provinces.find(item => item.value === params[0]);
                    province.children = cities;
                    let initData = [...params];
                    fn(provinces, initData);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        doAreas(data, end) {
            return Object.values(data).map(item => ({
                label: item.areaName,
                value: item.searchCode,
                children: end ? null : []
            }));
        }
    },
    created() {
        this.init();
        for (const item of this.config.quotas) {
            //  初始化查询表单
            if (item.filter) {
                this.$set(this.formData, item.key, '')
            }
            /* 获取枚举类型 
             * TODO 待优化
             */
            if (item.enum) {
                getEnum(item.enum, (res, type, list) => {
                    this.enums = list;
                });
            }
        }
    },
    computed: {
        quotasFilter: function() {
            return this.config.quotas.filter(item => item.filter)
        },
        quotasAdd: function() {
            return this.config.quotas.filter(item => item.create)
        },
        quotasEdit: function() {
            return this.config.quotas.filter(item => item.update)
        },
        quotasShow: function() {
            return this.config.quotas.filter(item => item.read)
        }
    },
}