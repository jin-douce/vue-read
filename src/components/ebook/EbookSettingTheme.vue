<template>
  <transition name="slide-up">
    <div class="setting-theme" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(item)">
        <div class="preview" :class="{ selected: item.name === defaultTheme.name }"
          :style="{ background: item.bgc}"></div>
        <div class="text" :class="{ selected: item.name === defaultTheme }">{{ item.name }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { THEME_LIST } from '../../utils/book'
import { ebookMixin } from "../../utils/mixin";
import { saveTheme } from "../../utils/localStorage";

export default {
  mixins: [ebookMixin],
  data() {
      return {
        themeList: THEME_LIST
      }
    },
  methods: {
    setTheme(theme) {  
      this.setDefaultTheme(theme)
      saveTheme(this.fileName, theme);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.setting-theme {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
</style>