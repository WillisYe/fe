<template>
  <div class>
    <el-table-column v-for="item in quotasShow" :key="item.key" align="center" :label="item.name" :min-width="getWidth(item)">
      <template slot-scope="scope">
        <template>{{getVal(scope,item)}}</template>
      </template>
    </el-table-column>
  </div>
</template>

<script>
  export default {
    name: "xw-form-items",
    components: {},
    props: {
      quotasShow: Object
    },
    data() {
      return {
        areas: [],
        children: [
          {
            slot: "el-cascader"
          },
          {
            slot: "el-input"
          }
        ]
      };
    },
    methods: {
      getWidth(item) {
        return item.name.length * 14 + 25 + "px";
      },
      getVal(scope, item) {
        let val = "";
        switch (item.type) {
          case "select":
            val = this.$parent.$parent.enums[item.enum][scope.row[item.key]];
            break;
          case "selects":
            let list = scope.row[item.key].split(",");
            for (const itemi of list) {
              val += this.$parent.$parent.enums[item.enum][itemi];
            }
            break;
          case "bool":
            val = ["否", "是"][scope.row[item.key]];
            break;
          default:
            val = scope.row[item.key];
            break;
        }
        return val;
      }
    },
    created() {},
    computed: {}
  };
</script>

<style lang="scss">
  .el-form--inline .el-form-item {
    width: 320px;
  }
</style>