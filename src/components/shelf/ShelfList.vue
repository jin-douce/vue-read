<template>
  <div class="shelf-list">
    <div class="item-wrapper" v-for="item in data" :key="item.ids">
        <shelf-item :data="item" :style="{ height: itemHeight }"></shelf-item>
        <div class="title-wrapper">{{ item.types===1 ? item.name : item.types===2 ? '分组'+item.title : ''}}</div>
    </div>
  </div>
</template>


<script>
import { storeShelfMixin } from "../../utils/mixin";
import { px2rem, realPx } from "../../utils/utils";
import ShelfItem from "./ShelfItem";
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfItem,
  },
  props: {
    data: Array,
  },
  computed: {
    itemHeight() {
      return ((window.innerWidth - realPx(120)) / 3 / 250) * 350 + "px";
      // 宽度为1/3，根据宽度和比例计算高度
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-list {
  position: absolute;
  left: 0;
  top: px2rem(52);
  width: 100%;
  z-index: 100;
  display: flex;
  flex-flow: row wrap;
  padding: 0 px2rem(15);
  box-sizing: border-box;
  .item-wrapper {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: px2rem(15);
    box-sizing: border-box;
    &.list-leave-active {
      display: none;
    }
    &.list-move {
      transition: transform 0.5s;
    }
    .title-wrapper {
      margin-top: px2rem(15);
      font-size: px2rem(10);
    }
  }

}
</style>