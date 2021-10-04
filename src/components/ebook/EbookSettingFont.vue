<template>
  <transition name="slide-up">
    <div class="setting-font-size" v-show="menuVisible && settingVisible === 0">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
          <div class="line"></div>
          <div class="point-wrapper">
            <div class="point" v-show="defaultFontSize === item.fontSize">
              <div class="small-point"></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
    </div>
  </transition>
</template>

<script>
  import { FONT_SIZE_LIST } from '../../utils/book'
  import { ebookMixin } from '../../utils/mixin'
  import { saveFontSize } from '../../utils/localStorage'

  export default {
    mixins: [ebookMixin],
    data() {
      return {
        fontSizeList: FONT_SIZE_LIST
      }
    },
    methods: {
      setFontSize(fontSize) {
        this.setDefaultFontSize(fontSize)
        saveFontSize(this.fileName, fontSize)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .setting-font-size {
      position: absolute;
      bottom: px2rem(48);
      left: 0;
      z-index: 160;
      display: flex;
      width: 100%;
      height: px2rem(90);
      background: white;
      .preview {
        flex: 1;
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        align-items: center;
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid #ccc;
          .point {
            position: absolute;
            top: px2rem(-8);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background: white;
            border: px2rem(1) solid #ccc;
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              background: black;
              border-radius: 50%;
            }
          }
        }       
      }
    }
</style>
