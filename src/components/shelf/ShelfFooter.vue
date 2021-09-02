<template>
  <div class="shelf-footer">
    <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
      <div class="shelf-footer-tab" :class="{ 'is-selected': isSelected }">
       
        <div class="icon-move tab-icon" v-if="item.index === 1"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 2"></div>
        <div class="tab-text" :class="{ 'remove-text': item.index === 2 }">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import {getBookShelf,saveBookShelf,removeLocalStorage,} from "../../utils/localStorage";

export default {
  mixins: [storeShelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    }, 
    tabs() {
      return [
        {
          label: '移动到',
          index: 1,
        },
        {
          label: '移出书架',
          index: 2,
        },
      ];
    },

  },
  data() {
    return {
      popupMenu: null,
    };
  },
  methods: {
    onComplete() {
      // 隐藏弹窗；取消编辑状态；保存修改后的bookList
      this.hidePopup();
      this.setIsEditMode(false);
      // shelfSelected是对象引用，它的变化会引起bookList的变化
      saveBookShelf(this.bookList);
    },
    hidePopup() {
      this.popupMenu.hide();
    },

    // 移出书架
    removeSelected() {
      
      if(this.currentType === 2){
          this.setShelfList(
          this.shelfList.map((book) => {
            if (book.types === 2 && book.itemList) {
              // 只保留未选中的图书
              book.itemList = book.itemList.filter(
                (subBook) => !subBook.selected
              );
            }
            return book;
          })
        )
      }else if(this.currentType === 1){
        this.setShelfList(this.shelfList.filter((book) => !book.selected));
      }
      
  
      this.setShelfSelected([]);
      this.onComplete();
      // console.log(this.shelfList);
      saveBookShelf(this.shelfList);
      // 保存未成功，get返回的是null
      let ss = getBookShelf();
      // console.log("缓存", ss);
    },
    showRemove() {
      let title = '是否将所选书籍移出书架？'
     
      this.popupMenu = this.popup({
        title: title,
        btn: [
          {
            text: '移出',
            type: "danger",
            click: () => {
              this.removeSelected();
            },
          },
          {
            text: '取消',
            click: () => {
              this.hidePopup();
            },
          },
        ],
      }).show();
    },
    onTabClick(item) {
      if (!this.isSelected) {
        return;
      }
      switch (item.index) {
        case 1:
          this.dialog().show();
          break;
        case 2:
          this.showRemove();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      &.is-selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
        &.remove-text {
          color: red;
        }
      }
      .icon-shelf {
        color: red;
      }
    }
  }
}
</style>