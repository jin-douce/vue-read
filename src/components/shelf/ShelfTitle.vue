<template>
  <transition name="fade">
    <div class="shelf-title" :class="{ 'hide-shadow': ifHideShadow }" v-show="shelfTitleVisible">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{ title }}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
        <span class="shelf-title-btn-text" @click="gotoStore">去找书</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
        <span class="shelf-title-btn-text" @click="onEditClick">{{isEditMode ? '取消' : '编辑'}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
        <span class="icon-back" @click="back"></span>
      </div>
      <div
        class="shelf-title-btn-wrapper"
        :class="{
          'shelf-title-left': changeGroupLeft,
          'shelf-title-right': changeGroupRight,
        }"
        @click="changeGroup"
        v-if="showChangeGroup"
      >
        <span class="shelf-title-btn-text">修改分组</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import { clearLocalForage } from "../../utils/localForage";
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
    showEdit() {
      return this.currentType === 1 || !this.emptyCategory;
    },
    showClear() {
      return this.currentType === 1;
    },
    showBack() {
      return this.currentType === 2 && !this.isEditMode;
    },
    showChangeGroup() {
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory);
    },
    changeGroupLeft() {
      return !this.emptyCategory;
    },
    changeGroupRight() {
      return this.emptyCategory;
    },
    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0;
      return selectedNumber <= 0
        ? '选择书籍'
        : selectedNumber === 1
        ? '已选择$1本'.replace("$1", selectedNumber)
        : '已选择$1本'.replace("$1", selectedNumber);
    },
    popupCancelBtn() {
      return this.createPopupBtn('取消', () => {
        this.hidePopup();
      });
    },
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false;
      } else {
        this.ifHideShadow = true;
      }
    },
  },
  data() {
    return {
      ifHideShadow: true,
    };
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
    deleteGroup() {
      if (!this.emptyCategory) {
        // itemList全部置位选中状态
        this.setShelfSelected(this.shelfCategory.itemList);
        this.moveOutOfGroup(this.onComplete);
      } else {
        this.onComplete();
      }
    },
    changeGroupName() {
      this.hidePopup();
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title,
      }).show();
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
    showDeleteGroup() {
      this.hidePopup();
      setTimeout(() => {
        this.popupMenu = this.popup({
          title: '删除分组后，分组内的书籍将会自动移出分组',
          btn: [
            this.createPopupBtn(
              '确定',
              () => {
                this.deleteGroup();
              },
              "danger"
            ),
            this.popupCancelBtn,
          ],
        }).show();
      }, 200);
    },
    changeGroup() {
      this.popupMenu = this.popup({
        btn: [
          this.createPopupBtn('修改分组名', () => {
            this.changeGroupName();
          }),
          this.createPopupBtn(
            '解散分组',
            () => {
              this.showDeleteGroup();
            },
            "danger"
          ),
          this.popupCancelBtn,
        ],
      }).show();
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
    clearCache() {
      clearLocalStorage();
      clearLocalForage();
      this.setShelfList([]);
      this.setShelfSelected([]);
      this.getShelfList();
      this.simpleToast('缓存已清空');
    },
    gotoStore(){
      this.$router.push("/store/home");
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
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
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
    .shelf-title-sub-text {
      font-size: px2rem(10);
      color: #333;
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include center;
    .shelf-title-btn-text {
      font-size: px2rem(14);
      color: #666;
    }
    .icon {
      font-size: px2rem(20);
      color: #666;
    }
    &.shelf-title-left {
      left: 0;
      padding-left: px2rem(15);
    }
    &.shelf-title-right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>



