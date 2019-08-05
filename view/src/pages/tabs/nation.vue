<template>
  <div>
    <mt-header fixed title="种族资料">
      <mt-button @click.native="togglePopup" icon="more" slot="left"></mt-button>
    </mt-header>
    <mt-popup v-model="popupVisible" position="left">
      <div class="btns-wrap">
        <mt-cell @click.native="changeNation('hum')" :class="current.nation==='hum'?'active':''" is-link>人族</mt-cell>
        <mt-cell @click.native="changeNation('ne')" :class="current.nation==='ne'?'active':''" is-link>暗夜</mt-cell>
        <mt-cell @click.native="changeNation('orc')" :class="current.nation==='orc'?'active':''" is-link>兽族</mt-cell>
        <mt-cell @click.native="changeNation('ud')" :class="current.nation==='ud'?'active':''" is-link>不死</mt-cell>
      </div>
    </mt-popup>
    <div class="content-wrap">
      <div class="unit-list">
        <div @click="changeUnit(index)" :class="current.index===index?'active':''" class="unit-item" v-for="(item,index) in current.list" :key="item.name">{{item.name}}</div>
      </div>
      <div v-html="current.html"></div>
    </div>
  </div>
</template>

<script>
  import Papa from "papaparse";
  export default {
    data() {
      return {
        popupVisible: false,
        nation: "",
        hum: [],
        ne: [],
        orc: [],
        ud: [],
        current: {
          nation: "",
          list: [],
          html: "",
          index: 0
        }
      };
    },
    methods: {
      togglePopup() {
        this.popupVisible = !this.popupVisible;
      },
      getList(data) {
        data = data.map(item => item[0]);
        data = data.filter(item => item.length > 10);
        data = data.map(item => {
          let arr = item.split("</table>");
          arr = arr.slice(1);
          let [name, html] = [this.getName(arr[0]), arr.join("</table>")];
          if (name.includes("：")) {
            this.nation = name.slice(0, 2);
            name = name.slice(3);
          }
          return {
            name,
            html,
            type: name.includes("：") ? "hero" : "unit",
            nation: this.nation
          };
        });
        return data;
      },
      getName(html) {
        let temp = html.match(/<td([\S\s]*?)<\/td>/g);
        let name = temp[2] || temp[0];
        name = name.replace(/<([\S\s]*?)>/g, "");
        name = name.replace(/\s*/g, "");
        name = name.replace(/\(.*\)/, "");
        return name;
      },
      changeNation(nation) {
        document.querySelector(".content-wrap").scrollTo(0, 0);
        this.current.list = this[nation];
        this.current.nation = nation;
        this.changeUnit(0);
        this.popupVisible = false;
      },
      changeUnit(index) {
        this.current.html = this.current.list[index].html;
        this.current.index = index;
      }
    },
    created() {
      let self = this;
      Papa.parse("../static/data/nation.csv", {
        download: true,
        complete: function(res) {
          let data = res.data.slice(0, -6);
          let list = self.getList(data);
          self.hum = list.filter(item => ["人类", "人族"].includes(item.nation));
          self.ne = list.filter(item => item.nation === "暗夜");
          self.orc = list.filter(item => item.nation === "兽族");
          self.ud = list.filter(item => item.nation === "不死");
          self.changeNation("hum");
        }
      });
    }
  };
</script>

<style lang="scss">
  .nation-wrap {
    background-color: #eee;
    margin-top: 15px;
    display: flex;
    li {
      width: 25%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &.active {
        color: green;
      }
    }
  }
  .unit-list {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    font-size: 0;
    .unit-item {
      display: inline-block;
      font-size: 14px;
      width: 25%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      overflow: hidden;
      &.active {
        color: green;
      }
    }
  }
</style>
