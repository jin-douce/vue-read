<template>
  <div class="shelf-item" @click="onItemClick">
    <component
      class="shelf-item-comp"
      :class="{ 'is-edit': isEditMode && data.types === 2 }"
      :is="item"
      :data="data"
    ></component>
    <div
      class="icon-check"
      :class="{ 'is-selected': data.selected }"
      v-show="isEditMode && data.types === 1"
    ></div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import ShelfBook from "./ShelfItemBook";
import ShelfCategory from "./ShelfItemCategory";
import ShelfAdd from "./ShelfItemAdd";

export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object,
  },
  computed: {
    item() {
      return this.data.types === 1
        ? this.book
        : this.data.types === 2
        ? this.category
        : this.add;
    },
  },
  data() {
    return {
      book: ShelfBook,
      category: ShelfCategory,
      add: ShelfAdd,
    };
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        // 编辑模式下
        this.data.selected = !this.data.selected;
        if (this.data.selected && this.data.types===1) {
          this.shelfSelected.pushWithoutDuplicate(this.data);
        } else {
          this.setShelfSelected(
            this.shelfSelected.filter((item) => item.ids !== this.data.ids)
          );
        }
      } else {
        // 非编辑模式下
        if (this.data.types === 1) {
          this.$router.push({
            path: '/store/detail',
            query: { bookId: this.data.id } //到书籍详情，传参为书籍id
          })
        } else if (this.data.types === 2) {
          this.$router.push({
            path: "/store/category",
            query: { title: this.data.title }, //到storeCategory进入分组内，传参为分组名
          });
        } else  this.$router.push({path: '/store/home'})   
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.shelf-item {
  position: relative;
  width: 100%;
  height: 100%;
  .shelf-item-comp {
    opacity: 1;
    &.is-edit {
      opacity: 0.5;
    }
  }
  .icon-check {
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: rgb(70, 138, 241);
    }
  }
}
</style>