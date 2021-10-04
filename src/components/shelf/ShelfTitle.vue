<template>
  <div class="shelf-title" v-show="shelfTitleVisible">
      <div class="text-wrapper">
        <span class="shelf-title-text">{{ title }}</span>
        <span class="sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="btn-wrapper left" v-if="currentType === 1">
        <span class="btn-text" @click="gotoStore">去找书</span>
      </div>
      <div class="btn-wrapper right" v-if="currentType === 1 || !this.emptyCategory">
        <span class="btn-text" @click="onEditClick">{{isEditMode ? '取消' : '编辑'}}</span>
      </div>
      <div class="btn-wrapper left" v-if="this.currentType === 2">
        <span class="btn-text" @click="back">返回</span>
      </div>
      <div class="btn-wrapper right" v-if="currentType === 2 && this.emptyCategory">
        <span class="btn-text" @click="removeGroup">删除分组</span>
      </div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import { clearLocalStorage, saveBookShelf } from "../../utils/localStorage";
export default {
  mixins: [storeShelfMixin],
  props: {
    title: String,
  },
  computed: {
    emptyCategory() {
      return (
        !this.shelfCategory ||
        !this.shelfCategory.itemList ||
        this.shelfCategory.itemList.length === 0
      );
    },

    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0;
      return selectedNumber <= 0 ? '选择书籍' : '已选择$1本'.replace("$1", selectedNumber)
    },
    popupCancelBtn() {
      return this.createPopupBtn('取消', () => {
        this.hidePopup();
      });
    },
  },
  methods: {
    onComplete() {
      this.hidePopup();
      this.setShelfList(
        this.shelfList.filter((book) => book.ids !== this.shelfCategory.ids)
      ).then(() => {
        saveBookShelf(this.shelfList);
        this.$router.go(-1);
        this.setIsEditMode(false);
      });
    },

    hidePopup() {
      this.popupMenu.hide();
    },
    createPopupBtn(text, onClick, type = "normal") {
      return {
        text: text,
        type: type,
        click: onClick,
      };
    },

    back() {
      this.$router.go(-1);
      this.setIsEditMode(false);
    },
    onEditClick() {
      this.setShelfSelected([]);
      if (!this.isEditMode) { 
        // 点击前不是编辑模式，就将所有书籍设为非选中状态
        this.shelfList.forEach((item) => {
          item.selected = false;
          if (item.itemList) {
            item.itemList.forEach((subItem) => {
              subItem.selected = false;
            });
          }
        });
      }
      this.setIsEditMode(!this.isEditMode);
    },
    gotoStore(){
      this.$router.push("/store/home");
    },
    removeGroup(){
      this.setShelfList(this.shelfList.filter(book => book.ids!==this.shelfCategory.ids))
        .then(() => { this.simpleToast('成功删除分组')})
      saveBookShelf(this.shelfList);
      this.$router.push("/store/shelf");
    }
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
 
.shelf-title {
  position: relative;
  z-index: 130;
  width: 100%;
  height: px2rem(42);
  background: rgb(208, 241, 154);
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);

  .text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: px2rem(16);
      line-height: px2rem(20);
      font-weight: bold;
      color: #333;
    }
    .sub-text {
      font-size: px2rem(10);
      color: #333;
    }
  }
  .btn-wrapper {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include center;
    .btn-text {
      font-size: px2rem(14);
      color: #666;
    }
    .icon {
      font-size: px2rem(20);
      color: #666;
    }
    &.left {
      left: 0;
      padding-left: px2rem(15);
    }
    &.right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>



