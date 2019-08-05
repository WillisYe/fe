<template>
  <el-card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{background: color, width: leftWidth}">
        <i class="icon" :class="icon"></i>
      </div>
      <div class="right-area" :style="{width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "InforCard",
    components: {},
    props: {
      left: {
        type: Number,
        default: 36
      },
      color: {
        type: String,
        default: "#2d8cf0"
      },
      icon: {
        type: String,
        default: ""
      },
      iconSize: {
        type: Number,
        default: 20
      },
      shadow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      leftWidth() {
        return `${this.left}%`;
      },
      rightWidth() {
        return `${100 - this.left}%`;
      }
    },
    methods: {}
  };
</script>

<style lang="scss">
  .common {
    float: left;
    height: 100%;
    display: table;
    text-align: center;
  }
  .size {
    width: 100%;
    height: 100%;
  }
  .middle-center {
    display: table-cell;
    vertical-align: middle;
  }
  .info-card-wrapper {
    @extend .size;
    overflow: hidden;
    .el-card__body {
      @extend .size;
      padding: 0;
    }
    .content-con {
      @extend .size;
      position: relative;
      .left-area {
        @extend .common;
        & > .icon {
          @extend .middle-center;
          font-size: 36px;
          color: #fff;
        }
      }
      .right-area {
        @extend .common;
        & > div {
          @extend .middle-center;
        }
      }
    }
  }
</style>
