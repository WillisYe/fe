<template>
  <div>
    <mt-header fixed title="新手必读">
      <mt-button @click.native="togglePopup" icon="more" slot="left"></mt-button>
    </mt-header>
    <mt-popup v-model="popupVisible" position="left">
      <div class="btns-wrap">
        <mt-cell @click.native="getContent(item)" v-for="(item, index) in list" :key="index" :title="item[0]" is-link :class="current[0]===item[0]?'active':''"></mt-cell>
      </div>
    </mt-popup>
    <div class="content-wrap">
      <h2>{{current[0]}}</h2>
      <div v-html="current[1]"></div>
    </div>
  </div>
</template>

<script>
  import Papa from "papaparse";
  export default {
    data() {
      return {
        popupVisible: false,
        list: [],
        current: []
      };
    },
    methods: {
      togglePopup() {
        this.popupVisible = !this.popupVisible;
      },
      getContent(item) {
        document.querySelector(".content-wrap").scrollTo(0, 0);
        this.current = item;
        this.popupVisible = false;
      }
    },
    created() {
      let self = this;
      Papa.parse("../static/data/creeps.csv", {
        download: true,
        complete: function(res) {
          let data = res.data;
          self.list = data.filter(
            item => item.length === 2 && item[1].length > 150
          );
          self.getContent(self.list[0]);
        }
      });
    }
  };
</script>

<style lang="scss">
  .btns-wrap {
    height: 100vh;
    overflow-y: auto;
  }
</style>
