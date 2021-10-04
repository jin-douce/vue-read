<template>
<!-- 书架页面 -->
  <div class="store-shelf">
    <shelf-title title="书架"></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" :bottom="scrollBottom" :top="0" @onScroll="onScroll" ref="scroll">  
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll";
import ShelfTitle from "../../components/shelf/ShelfTitle";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFooter from "../../components/shelf/ShelfFooter";
import { storeShelfMixin } from "../../utils/mixin";

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfList,
    ShelfFooter,
  },
  watch: {
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0;
      this.$nextTick(() => {
        // 等界面变化完再refresh
        this.$refs.scroll.refresh();
      });
    },
  },
  data() {
    return {
      scrollBottom: 0,
    };
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    },
  },
  mounted() {
    this.getShelfList();
    this.setShelfCategory([]); //书架分组初始化为空，即无分组
    this.setCurrentType(1); // currentType为1，表示当前位于书架，ShelfTitle显示书架
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>