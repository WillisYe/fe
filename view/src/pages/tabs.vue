<template>
  <div class="app-wrap">
    <router-view></router-view>
    <mt-tabbar v-model="selected" @click.native="handleChange">
      <mt-tab-item id="nation">
        <img slot="icon" src="../../static/t1.png" />
        种族资料
      </mt-tab-item>
      <mt-tab-item id="tips">
        <img slot="icon" src="../../static/t2.png" />
        新手必读
      </mt-tab-item>
      <mt-tab-item id="hero">
        <img slot="icon" src="../../static/t3.png" />
        统计分析
      </mt-tab-item>
      <mt-tab-item id="prop">
        <img slot="icon" src="../../static/t4.png" />
        宝物大全
      </mt-tab-item>
      <mt-tab-item id="creeps">
        <img slot="icon" src="../../static/t5.png" />
        野外生物
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "tabs",
    components: {},
    data() {
      return {
        selected: "nation"
      };
    },
    methods: {
      handleChange() {
        this.$router.push(`/${this.selected}`);
      }
    },
    computed: {},
    mounted() {},
    created() {
      this.handleChange();
      this.$http.get("/api/creep", {}).then(res => {
        // console.log(res);
      });
      this.$http.get("/api/prop", {}).then(res => {
        // console.log(res);
      });
    },
    updated() {}
  };
</script>

<style lang="scss">
  .content-wrap {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding: 50px 10px 75px;
    word-break: break-all;
    table {
      border-collapse: collapse;
    }
    h2 {
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .mint-cell {
    &.active {
      background-color: #ddd;
    }
  }
</style>