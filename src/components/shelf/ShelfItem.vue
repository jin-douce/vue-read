<template>
  <div class="shelf-item" @click="onItemClick">
    <component class="comp" :is="item" :data="data"></component>
    <div class="icon-check" :class="{ 'is-selected': selected }" 
    v-show="isEditMode && data.types === 1"></div>
  </div>
</template> 

<script>
import { storeShelfMixin } from "../../utils/mixin";
import ShelfBook from "./ItemBook";
import ShelfCategory from "./ItemCategory";

export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object,
  },
  computed: {
    item() {
      return this.data.types === 1
        ? this.book
        : this.category
    },
    selected() {
      return this.shelfSelected.indexOf(this.data)>-1
    },
  },
  data() {
    return {
      book: ShelfBook,
      category: ShelfCategory,
    };
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        // 编辑模式下
        if(this.data.types===1){
          this.data.selected = !this.data.selected;
        }  
        if (this.data.selected && this.shelfSelected.indexOf(this.data)===-1) {
          this.shelfSelected.push(this.data);
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
        } 
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