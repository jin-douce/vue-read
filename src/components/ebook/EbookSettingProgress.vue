<template>
   <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
            <span class="read-time-text">{{getReadTimeText()}}</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
              <span class="back">上一章</span>
          </div>
          <div class="progress-icon-wrapper" @click="nextSection()">
              <span class="forward">下一章</span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{titleList[currentCpt-1]}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

export default {
    mixins: [ebookMixin],
    methods: {
        // 跳转到上一章
        prevSection(){
          if(this.currentCpt > 1){
            this.setCurrentCpt(this.currentCpt - 1)
          }
        },
        nextSection(){
          if(this.currentCpt < 20){
            this.setCurrentCpt(this.currentCpt + 1)
          }
        },
    }, 
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/global';
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
        .read-time-wrapper {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: px2rem(40);
          font-size: px2rem(12);
          @include center;
        }
        .progress-wrapper {
          width: 100%;
          height: 100%;
          @include center;
          padding: 0 px2rem(15);
          box-sizing: border-box;
          .progress-icon-wrapper {
              font-size: px2rem(20);
              padding: 0 px2rem(45);
          }
          .progress {
            width: 100%;
            -webkit-appearance: none;
            height: px2rem(2);
            margin: 0 px2rem(10); 
            &:focus {
              outline: none;
            }
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: px2rem(20);
              width: px2rem(20);
              border-radius: 50%;
              background: white;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
              border: px2rem(1) solid #ddd;
            }
          }
        }
        .text-wrapper {
          position: absolute;
          left: 0;
          bottom: px2rem(10);
          width: 100%;
          color: #333;
          font-size: px2rem(12);
          padding: 0 px2rem(15);
          box-sizing: border-box;
          @include center;
          .progress-section-text {
            @include ellipsis;
          }
        }
      }
  }
</style>