<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {};
    },
    created() {}
  };
</script>

<style lang="scss">
  blockquote,
  body,
  dd,
  dl,
  dt,
  fieldset,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  html,
  iframe,
  legend,
  li,
  ol,
  p,
  pre,
  textarea,
  ul {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Helvetica Neue, Helvetica, Microsoft YaHei, SimSun, PingFang SC,
      Hiragino Sans GB, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    position: relative;
    // overflow-y: scroll;
  }
  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  em {
    font-style: normal;
  }

  // 设置此样式会导致el-table带边框时出现横向滚动条bug
  // table {
  //     border-collapse: collapse
  // }
  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0 none;
  }

  html body,
  #app {
    .dropdown-submenu:focus > a,
    .dropdown-submenu:hover > a {
      background-color: $primary;
    }
  }

  .it-btn {
    width: 97px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    display: inline-block;
    border: 1px solid #aaa;
    cursor: pointer;
    & + .it-btn {
      margin-left: 16px;
    }
    &.active {
      border: 1px solid $primary;
      background-color: $primary;
      color: #fff;
    }
    &.it-btn-green {
      border: 1px solid green;
      background-color: green;
      color: #fff;
    }
    &.it-btn-disabled {
      border: 1px solid #aaa;
      background-color: #aaa;
      color: #fff;
      cursor: not-allowed;
    }
  }

  .it-btn-tc {
    width: 78px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
    border: 1px solid #797979;
    border-radius: 5px;
    font-size: 12px;
    & + .it-btn-tc {
      margin-left: 10px;
    }
    &.active {
      border: 1px solid $primary;
      background-color: $primary;
      color: #fff;
    }
    &.sm {
      width: 50px;
    }
    &.orange {
      border: 1px solid #ff9933;
      background-color: #ff9933;
      color: #fff;
    }
  }

  .it-nowrap {
    width: 100%;
    overflow: hidden;
    /*超过部分不显示*/
    text-overflow: ellipsis;
    /*超过部分用点点表示*/
    white-space: nowrap;
    /*不换行*/
  }
  @for $i from 2 through 10 {
    .it-nowrap-#{$i} {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      // // eslint-disable-next-line /* autoprefixer: off */ /* autoprefixer: on */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: $i;
    }
  }

  .it-text-left {
    text-align: left !important;
  }

  .it-text-center {
    text-align: center !important;
  }

  .it-text-right {
    text-align: right !important;
  }

  .it-text-blue {
    cursor: pointer;
    color: #1391c4 !important;
  }

  .it-text-b {
    color: #0080ff !important;
  }

  .it-text-green {
    color: #359262 !important;
  }
  .it-text-red {
    color: red !important;
  }
  .it-text-orange {
    color: #ff9933 !important;
  }
  .it-text-bold {
    font-weight: bold;
  }

  .it-tdu {
    text-decoration: underline;
  }

  .it-cup {
    cursor: pointer;
  }

  .it-fl {
    float: left;
  }

  .it-fr {
    float: right;
  }

  .it-vam {
    vertical-align: middle;
  }
  .it-db {
    display: block;
  }
  .it-dib {
    display: inline-block;
  }

  .it-posr {
    position: relative;
  }

  .it-posa {
    position: absolute;
  }

  .it-m0a {
    margin: 0 auto;
  }

  .it-indent {
    text-indent: 2em;
  }

  .it-bd {
    border-color: #ccc;
    border-radius: 5px;
  }

  .thumb16-wrap {
    img {
      width: auto;
      height: 16px;
      vertical-align: middle;
    }
  }
  .thumb32-wrap {
    img {
      width: auto;
      height: 32px;
      vertical-align: middle;
    }
  }
  .thumb64-wrap {
    img {
      width: auto;
      height: 64px;
      vertical-align: middle;
    }
  }

  .thumb16 {
    width: auto;
    height: 16px;
    vertical-align: middle;
  }
  .thumb24 {
    width: auto;
    height: 24px;
    vertical-align: middle;
  }
  .thumb32 {
    width: auto;
    height: 32px;
    vertical-align: middle;
  }
  .thumb64 {
    width: auto;
    height: 64px;
    vertical-align: middle;
  }

  // 暂时用来解决线上图标错乱bug
  .caret-wrapper {
    min-height: 24px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative !important;
  }

  // // 滚动条 0,153,204
  // $scroll: #c1c1c1;
  // // $scroll: $primary;
  // ::-webkit-scrollbar {
  //   width: 13px;
  //   height: 13px;
  // }
  // ::-webkit-scrollbar-button {
  //   width: 100%;
  //   height: 15px;
  // }
  // ::-webkit-scrollbar-button:start:decrement {
  //   background: #eef8fc url("../static/arrow_up.png") center center no-repeat;
  //   background-size: 95% auto;
  //   &:hover,
  //   &:active {
  //     background-image: url("../static/arrow_up_active.png");
  //   }
  // }
  // ::-webkit-scrollbar-button:end:increment {
  //   background: #eef8fc url("../static/arrow_down.png") center center no-repeat;
  //   background-size: 95% auto;
  //   &:hover,
  //   &:active {
  //     background-image: url("../static/arrow_down_active.png");
  //   }
  // }
  // ::-webkit-scrollbar-thumb {
  //   min-height: 28px;
  //   background-color: opacify($scroll, 0.8);
  //   border-radius: 5px;
  //   &:hover,
  //   &:active {
  //     background-color: opacify($primary, 1);
  //   }
  // }
  // ::-webkit-scrollbar-track {
  //   // opacify($scroll, 0.1)
  //   background-color: #eef8fc;
  // }
  // ::-webkit-scrollbar-corner,
  // ::-webkit-resizer {
  //   // background-color: opacify($scroll, 0.1);
  //   background-color: #eef8fc;
  // }

  body {
    .el-checkbox__inner {
      border-color: #5f6166;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
      background-color: #eee;
      border-color: #5f6166;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
      border-color: #5f6166;
    }
  }

  .it-checkbox {
    margin-bottom: 0;
    display: inline-block;
    cursor: pointer;
    input[type="checkbox"] {
      -webkit-appearance: none;
      outline: none;
      display: none;
    }
    input[type="checkbox"] + span {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 14px;
      line-height: 14px;
      vertical-align: middle;
      text-align: center;
      padding-left: 14px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid #5f6166;
        border-radius: 2px;
        width: 14px;
        height: 14px;
        background-color: #fff;
        z-index: 1;
        -webkit-transition: border-color 0.25s
            cubic-bezier(0.71, -0.46, 0.29, 1.46),
          background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
        transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
          background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      }
    }
    input[type="checkbox"]:checked + span {
      color: #409eff;
      &:before {
        background-color: #409eff;
        border-color: #409eff;
      }
      &:after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        z-index: 2;
        box-sizing: content-box;
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        width: 3px;
        height: 7px;
        transform: rotate(45deg);
        transform-origin: center;
      }
    }
    input[type="checkbox"]:disabled + span {
      color: #ccc;
      &:before {
        background-color: #eee;
        border-color: #5f6166;
      }
    }
  }
  // 登录框样式
  .wrap-login {
    padding-top: 50px;
    background-color: #fff;
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 460px;
    max-width: 90%;
    padding: 35px 35px 15px 35px;
    background: #fff;
    // border: 1px solid #eaeaea;
    box-shadow: 0 0 15px #e4e1e1;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #666;
    }
    .remember {
      color: #aaa;
      margin: 0px 0px 0px 0px;
    }
  }
  .tips-wrap {
    padding: 15px 0;
    color: #aaa;
    text-align: center;
  }
  .tcell-menu {
    .cell {
      overflow: visible;
    }
  }

  .el-pagination {
    padding: 0;
    .el-pager li {
      min-width: 16px;
    }
    .btn-next,
    .btn-prev {
      padding: 0 6px;
    }
  }
  // 图片弹出框
  .el-message-box {
    max-width: 95%;
    border: 0 !important;
    border-radius: 8px !important;
    .el-message-box__header {
      padding: 0 !important;
      text-align: center;
      .el-message-box__title {
        height: 40px;
        line-height: 40px;
        background-color: $primary;
        color: #fff;
      }
    }
    .el-message-box__content {
      padding: 10px 20px;
    }
  }
  .el-button {
    &.mini {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    &.el-button--primary {
      background-color: $primary;
    }
  }
  .imgmb-wrap {
    width: auto !important;
  }
  .el-dropdown-menu {
    max-height: 420px;
    overflow-y: auto;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #606266 !important;
  }
  .el-message {
    top: 70px !important;
  }

  .input-err {
    input {
      border-color: red !important;
    }
  }

  .el-scrollbar__wrap {
    overflow: auto !important;
  }

  .it-dialog .tit {
    background-color: $primary !important;
    color: #fff !important;
  }
  .bgc-main {
    background-color: $primary;
  }
  .color-main {
    color: $primary;
  }
</style>