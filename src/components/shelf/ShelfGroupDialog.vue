<!-- 移动分组时的弹出框 -->
<template>
  <ebook-dialog :title="!ifNewGroup ? '书籍分组' : '新建分组'" ref="dialog">
    <!-- 替换第一个slot -->
        <!-- 1.移动分组是用这个替换 -->
    <div class="dialog-list-wrapper" v-if="!ifNewGroup">
      <div class="is-add" @click="showAdd">新建分组</div>
      <div class="dialog-list-item" v-for="(item, index) in category" :key="index" @click="moveToGroup(item)">    
          <div class="dialog-list-item-text">{{ item.title }}</div>
          <div class="dialog-list-icon-wrapper" v-if="currentType === 2 && shelfCategory.ids === item.ids">
            <span class="icon-selected"></span>
          </div>
      </div>
    </div>
          <!-- 2.新建分组时用这个 -->
    <div class="dialog-new-group-wrapper" v-else>
      <div class="dialog-input-title-wrapper">
        <span>分组名</span>
      </div>
      <div class="dialog-input-wrapper">
          <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput"/>
          <div class="dialog-input-clear-wrapper" @click="clear">
            <span class="icon-close-circle-fill"></span>
          </div>
      </div>
    </div>
    <!-- 替换第二个slot -->
    <div slot="btn" class="group-dialog-btn-wrapper">
      <div class="dialog-btn" @click="hide">取消</div>
      <div class="dialog-btn" @click="createNewGroup" v-if="ifNewGroup">确定</div>
    </div>
  </ebook-dialog>
</template>

<script> 
import EbookDialog from "../common/Dialog";
import { storeShelfMixin } from "../../utils/mixin";
import { computeId,} from "../../utils/store";
import { saveBookShelf } from "../../utils/localStorage";

export default {
  name: "group-dialog",
  mixins: [storeShelfMixin],
  components: {
    EbookDialog,
  },

  data() {
    return {
      ifNewGroup: false,
      newGroupName: "",
    };
  },
  computed: {
    category () {
      return this.shelfList.filter(item => item.types === 2)
    },
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
      // hide有0.2s动画
      setTimeout(() => {
        this.ifNewGroup = false;
      }, 200);
    },
    showAdd(){
      this.ifNewGroup = true
    },
    clear() {
      this.newGroupName = "";
    },
    moveToGroup(group) {
      this.setShelfList(
        this.shelfList.filter(book => {
          if (book.itemList) {
            book.itemList = book.itemList.filter(sub => !sub.selected);
          }
          return !book.selected;
        })
      ).then(() => {
        // 将选中的图书和指定的分组合并
        if (group && group.itemList) {
          group.itemList = [...group.itemList, ...this.shelfSelected];
        }
        // 对分组重新排序
        group.itemList.forEach((item, index) => {
          item.ids = index + 1;
        });
        this.simpleToast(
          '成功移入$1'.replace("$1", group.title)
        );
        // 保存数据
        this.onComplete();
      });
    },
    
    createNewGroup() {
      if (!this.newGroupName || this.newGroupName.length === 0) {
        return;
      }
      // 创建新分组
      const group = {
        ids: this.shelfList[this.shelfList.length - 1].ids + 1,
        itemList: [],
        selected: false,
        title: this.newGroupName,
        types: 2,
      };
      let list = this.shelfList
      list.push(group)
      this.setShelfList(list)
      this.moveToGroup(group);
      this.onComplete()
    },
    
    onComplete() {
      saveBookShelf(this.shelfList);
      this.hide();
      this.setIsEditMode(false);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.dialog-list-wrapper {
  width: 100%;
  padding: 0 px2rem(20);
  box-sizing: border-box;
  font-size: px2rem(14);
  @include scroll;
  .is-add {
    color: rgb(100, 176, 226);
    margin-bottom: px2rem(10);
  }
  .dialog-list-item {
    display: flex;
    padding: px2rem(15) 0;
    box-sizing: border-box;
    color: #666;
    
    &:active {
      color: rgba(102, 102, 102, 0.5);
    }
    .dialog-list-item-text {
      flex: 1;
    }
    .dialog-list-icon-wrapper {
      flex: 0 0 px2rem(30);
      color: rgb(100, 176, 226);
      @include right;
    }
  }
}

.dialog-new-group-wrapper {
  width: 100%;
  padding: 0 px2rem(20);
  box-sizing: border-box;
  .dialog-input-title-wrapper {
    font-size: px2rem(15);
    margin-top: px2rem(20);
  }
  .dialog-input-wrapper {
      display: flex;
      width: 100%;
      padding: px2rem(10) 0 px2rem(30) 0;;
      box-sizing: border-box;
      border-bottom: px2rem(1) solid rgb(202, 200, 200);
      font-size: px2rem(14);
      color: #666;
      .dialog-input {
        flex: 1;
        border: none;
        &:focus {
          outline: none;
        }
      }
      .dialog-input-clear-wrapper {
        flex: 0 0 px2rem(30);
        color: #ccc;
        @include center;
        &:active {
          color: #999;
        }
      }
    }
}

.group-dialog-btn-wrapper {
  width: 100%;
  @include center;
}

.dialog-btn {
  flex: 1;
  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
