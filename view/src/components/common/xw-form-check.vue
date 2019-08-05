<template>
  <div class>
    <el-form :inline="true" :model="formData" class="unit-form form-inline" label-suffix label-width="115px" size="medium" :rules="rules" ref="queryValidateForm">
      <el-form-item v-if="hasArea" label="区划名称">
        <el-cascader ref="cascaderCheck" :filterable="false" :options="areas" :show-all-levels="true" @active-item-change="handleItemChange" placeholder :value="formData.areaNames" clearable></el-cascader>
      </el-form-item>

      <template v-for="item in quotasFilter">
        <el-form-item :key="item.key" :label="item.name" v-if="!['area'].includes(item.type)">
          <el-input v-if="['string'].includes(item.type)" :placeholder="`请输入${item.name}`" v-model="formData[item.key]"></el-input>
          <el-select v-if="['bool'].includes(item.type)" v-model="formData[item.key]" placeholder="请选择" :multiple="false">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
            <el-option label="全部" value></el-option>
          </el-select>
          <el-select v-if="['select'].includes(item.type)" v-model="formData[item.key]" placeholder="请选择" :multiple="false">
            <template v-for="(item,index) in $parent.enums[item.enum]">
              <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
            </template>
          </el-select>
          <el-select v-if="['selects'].includes(item.type)" v-model="formData[item.key]" placeholder="请选择" :multiple="true">
            <template v-for="(item,index) in $parent.enums[item.enum]">
              <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item style="width:auto">
        <el-button @click="beforeQuery('queryValidateForm')" type="primary">查询</el-button>
        <el-button @click="beforeAdd" type="success" v-if="$parent.perms.create">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "xw-form-check",
    components: {},
    props: {
      quotasFilter: Object
    },
    data() {
      return {
        areas: [],
        formData: JSON.parse(JSON.stringify(this.$parent.formData)),
        hasArea: !!this.$parent.quotasFilter.find(item => item.type === "area")
      };
    },
    methods: {
      // 查询疗休养基地
      beforeQuery(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = this.getParams(this.formData);
            this.$parent.getByPage(data);
          } else {
            return false;
          }
        });
      },
      // 查询表单参数处理
      getParams(data) {
        let params = JSON.parse(JSON.stringify(data));
        if (params.areaNames && params.areaNames.length) {
          params.areaCode = params.areaNames[params.areaNames.length - 1];
          let names = this.$refs.cascaderCheck.currentLabels;
          params.areaName = names[names.length - 1];
          delete params.areaNames;
        } else {
          params.areaCode = "";
          params.areaName = "";
        }
        return params;
      },
      // 新增疗休养基地
      beforeAdd() {
        this.$parent.getAreaList((provinces, initData) => {
          this.areas = provinces;
          this.$parent.dialogForm = {
            title: "新增疗休养基地",
            visible: true,
            data: this.initDialogFormData()
          };
          this.dialogForm.data.areaNames = initData;
        });
      },
      handleItemChange(params) {
        switch (params.length) {
          case 1:
            this.getAreas(params[0], "cities");
            break;
          case 2:
            this.getAreas(params[1], "counties");
            break;
          case 3:
            this.getAreas(params[2], "street");
            break;
          default:
            break;
        }
      },
      // 获取区划列表
      getAreas(code = "000000000000", type = "provinces", level = 3) {
        // level 3三级菜单 4四级菜单，地址详细到街道
        this.$http
          .get(`/api/admin/pubsrv/areasByParent/${code}`)
          .then(res => {
            let data = res.data.data;
            let list = Object.values(data).map(item => ({
              label: item.areaName,
              value: item.searchCode,
              children: []
            }));
            switch (type) {
              case "provinces":
                this.areas = list;
                break;
              case "cities":
                let city = this.areas.find(item => item.value === code);
                city.children = list;
                break;
              case "counties":
                for (const area of this.areas) {
                  let county = area.children.find(item => item.value === code);
                  if (county) {
                    county.children = list.map(item => {
                      let temp = {
                        label: item.label,
                        value: item.value
                      };
                      if (level > 3) {
                        temp.children = [];
                      }
                      return temp;
                    });
                  }
                }
                break;
              case "street":
                for (const area of this.areas) {
                  for (const city of area.children) {
                    let county = city.children.find(item => item.value === code);
                    if (county) {
                      county.children = list.map(item => ({
                        label: item.label,
                        value: item.value
                      }));
                    }
                  }
                }
                break;
              default:
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 初始化新增疗休养基地弹窗数据
      initDialogFormData() {
        return {
          areaNames: [],
          areaCode: "",
          areaName: "",
          organCert: "",
          unitName: "",
          deptTypes: [],
          address: "",
          contactName: "",
          contactPhone: "",
          leaderName: "",
          leaderPhone: ""
        };
      },
      initArea() {
        this.$set(this.formData, "areaNames", []);

        this.$parent.getAreaList((provinces, initData) => {
          this.areas = provinces;
          this.$set(this.formData, "areaNames", initData);
        });
      }
    },
    created() {
      if (this.hasArea) {
        this.initArea();
      }
    },
    mounted() {}
  };
</script>

<style lang="scss">
  .el-form--inline .el-form-item {
    width: 320px;
  }
</style>