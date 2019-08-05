<template>
<!-- 多级下拉菜单，启用时需在首页引入zui和jquery -->
  <div class="it-dropdown" :class="config.pullClass+' '+open" v-if="options&&options.length">
    <slot></slot>
    <ul class="dropdown-menu" :class="pull||' pull-right'">
      <li v-for="item in options" :key="item.value" :class="getClass(item)">
        <a @click="handleClick($event,item)" href="javascript:void(0)">{{item.label}}</a>
        <ul class="dropdown-menu" :class="config.subPullClass" v-if="item.children&&item.children.length">
          <li v-for="subItem in item.children" :key="subItem.value" :class="subItem.divider?'divider':''">
            <a v-if="subItem.label" @click="handleClick($event,subItem,item)" :class="item.on==subItem.value?'on':''" href="javascript:void(0)">{{subItem.label}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'zuiDropdown',
    props: {
      expandTrigger: String,
      options: Array,
      pull: String,
      open: String
    },
    data() {
      return {
        config: {
          pullClass: 'dropdown',
          subPullClass: 'pull-right'
        }
      };
    },
    methods: {
      getClass(item) {
        let r = '';
        if (item.children && item.children.length) {
          r += 'dropdown-submenu ';
        }
        return r;
      },
      handleClick(e, item, itemp) {
        let params = [];
        if (itemp) {
          params = [itemp.value, item.value];
          this.$emit('change', false, params);
          if(item.value!=0){
            itemp.on = item.value;//高亮当前
          }
        } else {
          if (!item.children) {
            params = [item.value];
            this.$emit('change', false, params);
          } else {
            let $menus = $(e.target).next('.dropdown-menu');
            let display = $menus.css('display');
            // if (window.innerWidth < 1360) {
            //   $menus.show();
            //   e.stopPropagation();
            // }
          }
        }
      },
      getConfig(open = '') {
        if(Object.keys(this.$el).length===1){
          return
        }        
        let bodyWidth = $(window).width();
        let bodyHeight = $(window).height();
        let left = $(this.$el).offset().left;
        let top = $(this.$el).offset().top - $(window).scrollTop();
        let width = $(this.$el).width();
        let height = $(this.$el).height();
        if (left + width + 160 < bodyWidth) {
          this.config.subPullClass = 'pull-right';
        } else {
          this.config.subPullClass = 'pull-left';
        }
        let menuHeight = this.options.length * 26 + 15;
        let maxHeight = menuHeight;
        this.options.forEach((item, index) => {
          if (item.children) {
            let height = (item.children.length + index) * 26 + 15;
            // 超过420px出滚动条
            height = Math.min(height, 420);
            maxHeight = Math.max(maxHeight, height);
          }
        });
        menuHeight = Math.max(maxHeight, menuHeight);
        if (top + height + menuHeight < bodyHeight) {
          this.config.pullClass = 'dropdown';
        } else {
          this.config.pullClass = 'dropup';
        }
      }
    },
    watch: {
      open(nv, ov) {
        if (nv === 'open') {
          this.getConfig();
        }
      }
    },
    mounted() {
      let self = this;
      $(this.$el).on('click', '[data-toggle]', function() {
        self.getConfig();
      });
    },
    beforeDestroy() {
      $(this.$el).off('click', '[data-toggle]');
    }
  };
</script>

<style lang="scss">
  .it-dropdown {
    display: inline-block;
    text-align: left;
    .dropdown-menu > li > a:focus {
      color: #333;
      background-color: #fff;
    }
    .dropdown-menu > li > a:hover,
    .dropdown-menu > li > a:active,
    .dropdown-menu > li > a.on {
      color: #fff !important;
      background-color: $primary !important;
    }
    .dropdown-submenu {
      .dropdown-menu {
        max-height: 420px;
        overflow-y: auto;
        &.pull-right {
          left: 100;
          right: auto;
        }
        &.pull-left {
          left: auto;
          right: 100%;
        }
      }
    }
  }
</style>