<template>
  <div class="shelf-footer" v-show="isEditMode" :class="{ 'is-selected': shelfSelected.length }">
    <div class="shelf-footer-tab" @click="showMove">
      <span class="icon-move tab-icon"></span>
      <span class="tab-text">移动到</span>  
    </div>
    <div class="shelf-footer-tab" @click="showRemove">
      <span class="icon-share tab-icon"></span>
      <span class="tab-text">{{ currentType===1 ? '移出书架' : '移出分组'}}</span>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import {getBookShelf,saveBookShelf,removeLocalStorage,} from "../../utils/localStorage";
import { computeId,} from "../../utils/store";

export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      popupMenu: null,
    };
  },
  methods: {
    showRemove() {
      let title = '是否将所选书籍移出？' 
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
    showMove(){
      this.dialog().show();
    },
    hidePopup() {
      this.popupMenu.hide();
    },
    // 移出书架或移出分组
    removeSelected() {  
      if(this.currentType === 2){ 
          this.moveOutFromGroup()
      }else if(this.currentType === 1){  
        this.setShelfList(this.shelfList.filter(book => !book.selected))
        .then(() => {this.simpleToast('成功移出')
        })
      }
      this.hidePopup();
      this.setShelfSelected([]);
      this.setIsEditMode(false);
      saveBookShelf(this.shelfList);
    },
    moveOutFromGroup() {
      let list = this.shelfList.map(book => {
          if (book.types === 2 && book.itemList) {
            book.itemList = book.itemList.filter(subBook => !subBook.selected)
          }
          return book;
        })
      list = computeId(list.concat(...this.shelfSelected))
      this.setShelfList(list).then(() => {
          this.simpleToast('成功移出');
        });
    }
  }
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
  opacity: 0.5;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, 0.1);
  &.is-selected {
    opacity: 1;
  }
  
  .shelf-footer-tab {
    flex: 1;
    width: 50%;
    height: 100%;
    @include columnCenter;
    .tab-icon {
      font-size: px2rem(20);
      color: #666;
    }
    .tab-text {
      margin-top: px2rem(5);
      font-size: px2rem(12);
      color: #666;
    }
  }
}
</style>