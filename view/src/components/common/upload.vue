<template>
  <el-upload
    :before-upload='handleBefore'
    :data='data'
    :headers='upload.headers'
    :on-error='handleError'
    :on-success='handleSuccess'
    :show-file-list='true'
    :action='action'
    class='upload-wrap'
    name='excelFile'
    drag
  >
    <i class='el-icon-upload'></i>
    <div class='el-upload__text'>
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <div class='el-upload__tip' slot='tip'>
      <slot></slot>
    </div>
  </el-upload>
</template>

<script>
  export default {
    name: "upload",
    props: {
      action: String,
      data: Object
    },
    data() {
      return {
        upload: {
          headers: {
            Authorization: this.$http.defaults.headers.common.Authorization
          },
          accept: ["xls", "xlsl"]
        }
      };
    },
    methods: {
      // 导入
      handleBefore(file) {
        let name = file.name;
        let temp = name.split(".");
        let type = temp[temp.length - 1];
        if (!this.upload.accept.includes(type) || file.size >= 2 * 2 ** 20) {
          this.$message({
            type: "error",
            message: "只能上传xls/xlsx文件,且不超过2M",
            showClose: true
          });
          return false;
        }
      },
      handleSuccess(res, file, fileList) {
        let type, message;
        if (res.success) {
          type = "info";
          message = res.data.replace(/\n/g, "<br><br>");
        } else {
          type = "error";
          message = res.msg;
        }
        this.$parent.$parent.dialogImport.visible = false;
        this.$message({
          type,
          message,
          showClose: true,
          lockScroll: false,
          dangerouslyUseHTMLString: true
        });
      },
      handleError(err, file, fileList) {
        this.$message.error({
          message: "导入失败",
          showClose: true,
          lockScroll: false
        });
      }
    }
  };
</script>

<style lang="scss">
  .upload-wrap {
    .el-upload__tip {
      font-size: 14px;
      line-height: 1.5;
    }
  }
</style>