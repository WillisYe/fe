<template>
  <el-dialog :title="dialogForm.title" visible center @close="dialogForm.visible = false">
    <el-form :inline="false" :model="form" class="form-tc" label-suffix label-width="150px" size="medium">
      <el-form-item v-if="hasArea" label="区划名称">
        <el-cascader ref="cascaderAdd" :filterable="false" :options="areas" :show-all-levels="true" @active-item-change="handleItemChange" placeholder :value="dialogForm.data.areaNames" clearable></el-cascader>
      </el-form-item>
      <template v-if="dialogForm.data.id">
        <template v-for="item in $parent.quotasEdit">
          <el-form-item :key="item.key" :label="item.name" v-if="!['area'].includes(item.type)">
            <el-input v-if="['string'].includes(item.type)" :placeholder="`请输入${item.name}`" v-model="dialogForm.data[item.key]"></el-input>
            <el-select v-if="['bool'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="false">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
              <el-option label="全部" value></el-option>
            </el-select>
            <el-select v-if="['select'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="false">
              <template v-for="(item,index) in $parent.enums[item.enum]">
                <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
              </template>
            </el-select>
            <el-select v-if="['selects'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="true">
              <template v-for="(item,index) in $parent.enums[item.enum]">
                <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </template>
      </template>
      <template v-else>
        <template v-for="item in $parent.quotasAdd">
          <el-form-item :key="item.key" :label="item.name" v-if="!['area'].includes(item.type)">
            <el-input v-if="['string'].includes(item.type)" :placeholder="`请输入${item.name}`" v-model="dialogForm.data[item.key]"></el-input>
            <el-select v-if="['bool'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="false">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
              <el-option label="全部" value></el-option>
            </el-select>
            <el-select v-if="['select'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="false">
              <template v-for="(item,index) in $parent.enums[item.enum]">
                <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
              </template>
            </el-select>
            <el-select v-if="['selects'].includes(item.type)" v-model="dialogForm.data[item.key]" placeholder="请选择" :multiple="true">
              <template v-for="(item,index) in $parent.enums[item.enum]">
                <el-option :key="index" :label="item" :value="parseInt(index)" v-if="index<7"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button @click="dialogForm.visible = false">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "xw-form-check",
    components: {},
    props: {
      dialogForm: Object
    },
    data() {
      return {
        areas: [],
        hasArea: !!this.$parent.quotasAdd.find(item => item.type === "area")
      };
    },
    methods: {
      // 查询表单参数处理
      getParams(data) {
        let params = JSON.parse(JSON.stringify(data));
        if (params.areaNames && params.areaNames.length) {
          params.areaCode = params.areaNames[params.areaNames.length - 1];
          let names = this.$refs.cascaderCheck.currentLabels;
          params.areaName = names[names.length - 1];
          delete params.areaNames;
        }
        return params;
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
      submit() {
        if (this.dialogForm.data.id) {
          this.updateUnit(this.dialogForm.data);
        } else {
          this.addUnitLabor();
        }
      },
      // 添加疗休养基地
      addUnitLabor() {
        let params = JSON.parse(JSON.stringify(this.dialogForm.data));
        if (params.areaNames && params.areaNames.length) {
          params.areaCode = params.areaNames[params.areaNames.length - 1];
          let names = this.$refs.cascaderAdd.currentLabels;
          params.areaName = names[names.length - 1];
          delete params.areaNames;
        }
        if (params.deptTypes) {
          params.deptTypes = params.deptTypes.join();
        }

        if (this.$parent.config.params) {
          params = { ...params, ...this.$parent.config.params };
        }
        if (this.$parent.config.pathSubmit) {
          this.$http
            .put(this.$parent.config.pathSubmit, params)
            .then(res => {
              this.$message.success({
                message: "提交成功",
                showClose: true,
                lockScroll: false
              });
              this.dialogForm.visible = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$http
            .post(this.$parent.config.path, params)
            .then(res => {
              this.$message.success({
                message: "创建成功",
                showClose: true,
                lockScroll: false
              });
              this.dialogForm.visible = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      // 更新疗休养基地信息
      updateUnit(unit) {
        let params = JSON.parse(JSON.stringify(unit));
        if (params.areaNames && params.areaNames.length) {
          params.areaCode = params.areaNames[params.areaNames.length - 1];
          let names = this.$refs.cascaderAdd.currentLabels;
          params.areaName = names[names.length - 1];
          delete params.areaNames;
        }
        if (params.deptTypes) {
          params.deptTypes = params.deptTypes.join();
        }

        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            if (
              [this.dialogForm.unit[key], null, ""].includes(params[key]) &&
              key !== "id"
            ) {
              delete params[key];
            }
          }
        }
        this.$http
          .put(this.$parent.config.path, params, {})
          .then(res => {
            this.$message.success({
              message: "更新成功",
              showClose: true,
              lockScroll: false
            });
            this.dialogForm.visible = false;
            this.$parent.getByPage();
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 反查区划上级 区划限制在台州市，导致数据错误，清空数据后不会存在此问题
      getAreaUpper(areaCode) {
        this.$http
          .get(`/api/admin/area/upper/${areaCode}`)
          .then(res => {
            let area = res.data.data;
            let params = [area.parentCode, area.searchCode, areaCode];
            this.$parent.getAreaList((provinces, initData) => {
              this.areas = provinces;
              this.dialogForm.data.areaNames = initData;
            }, params);
          })
          .catch(err => {
            console.log(err);
          });
      },
      initArea() {
        this.$set(this.dialogForm.data, "areaNames", []);

        // this.$parent.getAreaList((provinces, initData) => {
        //   this.areas = provinces;
        //   this.$set(this.dialogForm.data, "areaNames", initData);
        // });
      }
    },
    created() {
      if (this.hasArea) {
        this.initArea();
      }
      if (this.dialogForm.data.id) {
        this.getAreaUpper(this.dialogForm.data.areaCode);
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