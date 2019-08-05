<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 12:43:03
 * @LastEditTime: 2019-07-13 18:53:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="Login">
    <mt-header fixed title="固定在顶部"></mt-header>
    <h1>各种族资料</h1>
    <ul class="nation-wrap">
      <li @click="changeNation('hum')" :class="current.nation==='hum'?'active':''">人族</li>
      <li @click="changeNation('ne')" :class="current.nation==='ne'?'active':''">暗夜</li>
      <li @click="changeNation('orc')" :class="current.nation==='orc'?'active':''">兽族</li>
      <li @click="changeNation('ud')" :class="current.nation==='ud'?'active':''">不死</li>
    </ul>
    <div class="unit-ul">
      <div @click="changeUnit(index)" :class="current.index===index?'active':''" class="unit-li" v-for="(item,index) in current.list" :key="item.name">{{item.name}}</div>
    </div>
    <div v-html="current.html"></div>
  </div>
</template>

<script>
  import Papa from "papaparse";
  export default {
    name: "app",
    data() {
      return {
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
          console.log(name, this.nation);
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
        return name;
      },
      changeNation(nation) {
        this.current.list = this[nation];
        this.current.nation = nation;
        this.changeUnit(0);
      },
      changeUnit(index) {
        this.current.html = this.current.list[index].html;
        this.current.index = index;
      }
    },
    created() {
      let self = this;
      Papa.parse("../static/data/test.csv", {
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
  #Login {
    padding: 15px;
    h1 {
      text-align: center;
    }
  }
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
  .unit-ul {
    background-color: #eee;
    margin-top: 15px;
    font-size: 0;
    .unit-li {
      display: inline-block;
      font-size: 14px;
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &.active {
        color: green;
      }
    }
  }
</style>
