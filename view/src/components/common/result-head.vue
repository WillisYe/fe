<template>
  <div class="result-tit-wrap">
    <div class="result-tit">查询结果</div>
    <div class="result-btn-group">
      <div @click="importData" class="result-btn result-btn-primary" v-if="$parent.perms.create && $parent.config.pathImport">
        <img alt src="../../../static/import.png">
        <span>导入</span>
      </div>
      <div @click="exportData" class="result-btn result-btn-warning" v-if="$parent.config.pathExport">
        <img alt src="../../../static/export.png">
        <span>导出</span>
      </div>
    </div>
    <!-- 导入弹窗 -->
    <el-dialog :title="props.importTitle" :visible.sync="dialogImport.visible" center>
      <upload :action="props.importPath" :data="props.importData">
        <slot></slot>
      </upload>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from "@/components/common/upload";
  export default {
    name: "reuslt-head",
    components: { Upload },
    props: {
      props: Object
    },
    data() {
      return {
        // 导入
        dialogImport: {
          visible: false
        }
      };
    },
    methods: {
      // 导入
      importData() {
        this.dialogImport.visible = true;
      },
      // 导出
      exportData() {
        let params = JSON.parse(JSON.stringify(this.$parent.formData));
        params = { ...params, ...this.props.exportData };
        this.$http
          .get(this.props.exportPath, {
            params,
            responseType: "blob"
          })
          .then(res => {
            // 7:旅行社 8:疗休养基地 9:疗休养点
            let types = {
              1: "工会",
              5: "单位",
              7: "旅行社",
              8: "疗休养基地",
              9: "疗休养点"
            };
            let type = types[params.unitType] || "职工";
            this.download(res.data, type);
          })
          .catch(err => {
            console.log(err);
          });
      },
      download(data, type) {
        if (!data) {
          return;
        }
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", type + ".xls");
        document.body.appendChild(link);
        link.click();
      }
    }
  };
</script>

<style lang="scss">
  .result-tit-wrap {
    height: 56px;
    line-height: 56px;
    display: flex;
    .result-tit {
      flex: 1;
      color: $primary;
      font-size: 16px;
      font-weight: bold;
      &::before {
        content: "";
        display: inline-block;
        vertical-align: text-top;
        width: 3px;
        height: 16px;
        background-color: $primary;
        margin-right: 8px;
      }
    }
    .result-btn-group {
      display: flex;
      .result-btn {
        margin: 0 10px;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 1px;
          height: 12px;
          background-color: #e5e5e5;
          position: absolute;
          left: -10px;
          top: 50%;
          margin-top: -6px;
        }
        &:first-of-type {
          &::before {
            content: "";
            display: none;
          }
        }
        img {
          margin-right: 10px;
        }
        &.result-btn-primary {
          color: $primary;
        }
        &.result-btn-warning {
          color: $warning;
        }
      }
    }
  }
</style>