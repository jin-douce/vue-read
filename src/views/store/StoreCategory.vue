<template>
<!-- 书架分组(打开后) -->
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :bottom="scrollBottom"
      :top="0"
      @onScroll="onScroll"
      ref="scroll"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
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
    this.getCategoryList(this.$route.query.title); //获取title这个分组信息，并设置当前所在分组
    this.setCurrentType(2);
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