<template>
  <div class='page-wrap'>
    <el-pagination
      :current-page='result.current'
      :layout='page.layout'
      :page-size='page.size'
      :page-sizes='page.sizes'
      :total='result.total'
      @current-change='handleCurrentChange'
      @size-change='handleSizeChange'
      background
    >
      <span class='total'>共{{result.pages}}页，{{result.total}}条。</span>
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "xw-page",
    components: {},
    props: {
      page: Object,
      result: Object
    },
    data() {
      return {};
    },
    methods: {
      handleSizeChange(val) {
        if (val * this.result.current > this.result.total) {
          this.result.current = Math.ceil(this.result.total / val);
        }
        this.page.size = val;
        this.$parent.getByPage();
      },
      handleCurrentChange(val) {
        this.result.current = val;
        this.$parent.getByPage();
      }
    }
  };
</script>

<style lang="scss">
  .page-wrap {
    padding-top: 20px;
    .total {
      color: #606266;
      font-weight: 400;
    }
  }
</style>