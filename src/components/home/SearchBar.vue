<template>
  <div>
    <div class="search-bar" :class="{ 'hide-title': !titleVisible, 'hide-shadow': !shadowVisible }">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-icon-back-wrapper" @click="back">
            <span class="icon-shelf icon"></span>
          </div>
          <div class="title-text-wrapper">
            <span class="title-text title">书城</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>

      <div class="search-bar-input-wrapper" :class="{ 'hide-title': !titleVisible }">
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            class="input" type="text" v-model="searchText"
            @click="showSearch"
            @keyup.13.exact="search"
          />
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { storeHomeMixin } from "../../utils/mixin";

export default {
  mixins: [storeHomeMixin],
 
  data() {
    return {
      searchText: "",
      titleVisible: true,
      shadowVisible: false,
    };
  },
  // 使用watch监听offsetY
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
  },
  methods: {
    search() {
      this.$router.push({
        path: "/store/list",
        query: {
          keyword: this.searchText,
        },
      });
    },
    showFlapCard() {
      this.setFlapCardVisible(true);
    },
    person(){
      if(localStorage.getItem('userInfo')) {
          this.$router.push('/store/personal');
      }
      else {
          this.$router.push('/login');
      }
    },
    back() {
      if (this.offsetY > 0) {
        this.showShadow();
      } else {
        this.hideShadow();
      }
      this.$router.push("/store/shelf");
    },
    hideTitle() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    },
    showSearch() {
      this.hideTitle();
      this.hideShadow();
    },
  },
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.search-bar {
  
  position: relative;
  z-index: 150;
  width: 100%;
  height: px2rem(94);
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    background-color: rgb(208, 241, 154);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    .title-icon-back-wrapper {   
      position: absolute;
      left: px2rem(15);
      top: 0;
      // 不设置会被盖住，无法点击（绝对定位）
      z-index: 200;
      height: px2rem(42);
      transition: height $animationTime $animationType;
      @include center;

      .icon-back {
        font-size: 20px;
      }
    }
    .title-text-wrapper {
      
      width: 100%;
      height: px2rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
    }

  }
  

  // 向上移动通过改变最外层top来实现
  .search-bar-input-wrapper {
    
    position: absolute;
    left: 0;
    top: px2rem(42);
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
    }

    .search-bar-input {
      width: 100%;
      background: #f4f4f4e5;
      border-radius: px2rem(20);
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid rgb(223, 223, 223);
      @include left;
      .icon-search {
        color: rgb(129, 129, 129);
      }
      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;
        &:focus {
          outline: none;
        }
        
      }
    }
  }
}
</style>

