<!-- 移动分组时的弹出框 -->
<template>
  <ebook-dialog :title="title" ref="dialog">
    <!-- 替换第一个slot -->
        <!-- 1.移动分组 -->
    <div class="dialog-list-wrapper" v-if="!ifNewGroup">
      <template v-for="(item, index) in categoryList">
            <!-- 所有分组列表 -->
        <div class="dialog-list-item"
          :class="{ 'is-add': item.edit ? item.edit === 1 : false }"
          :key="index" @click="onGroupClick(item)"
          v-if="(item.edit === 2 && isInGroup) || item.edit !== 2 || !item.edit"
        >
          <div class="dialog-list-item-text">{{ item.title }}</div>
            <!-- 当前所在分组 -->
          <div class="dialog-list-icon-wrapper" v-if="isInGroup && shelfCategory.ids === item.ids">
            <span class="icon-selected"></span>
          </div>
        </div>
      </template>
    </div>
          <!-- 2.新建分组 -->
    <div class="dialog-new-group-wrapper" v-else>
      <div class="dialog-input-title-wrapper">
        <span>分组名</span>
      </div>
      <div class="dialog-input-wrapper">
        <div class="dialog-input-inner-wrapper">
          <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput"/>
          <div class="dialog-input-clear-wrapper" @click="clear"
            v-show="newGroupName && newGroupName.length > 0">
            <span class="icon-close-circle-fill"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 替换第二个slot -->
    <div slot="btn" class="group-dialog-btn-wrapper">
      <div class="dialog-btn" @click="hide">取消</div>
      <div class="dialog-btn" @click="createNewGroup" v-if="ifNewGroup"
       :class="{ 'is-empty': newGroupName && newGroupName.length === 0 }">
       确定
      </div>
    </div>
  </ebook-dialog>
</template>

<script>
import EbookDialog from "../common/Dialog";
import { storeShelfMixin } from "../../utils/mixin";
import { removeAddFromShelf, appendAddToShelf, computeId,} from "../../utils/store";
import { saveBookShelf } from "../../utils/localStorage";

export default {
  name: "group-dialog",
  mixins: [storeShelfMixin],
  components: {
    EbookDialog,
  },
  props: {
    showNewGroup: {
      type: Boolean,
      default: false,
    },
    groupName: String,
  }, 
  computed: {
    isInGroup() {
      return this.currentType === 2;
    },
    defaultCategory() {
      return [
        {
          title: '新建分组',
          edit: 1,
        },
        {
          title: '移出分组',
          edit: 2,
        },
      ];
    },
    // 所有分组
    category() {
      return this.shelfList.filter((item) => item.types === 2);
    },
    // 所有分组合并上新建和移出选项
    categoryList() {
      return [...this.defaultCategory, ...this.category];
    },
    title() {
      return !this.ifNewGroup
        ? '书籍分组'
        : '新建分组';
    },
  },
  data() {
    return {
      ifNewGroup: false,
      newGroupName: "",
    };
  },
  methods: {
    show() {
      this.ifNewGroup = this.showNewGroup;
      this.newGroupName = this.groupName;
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
      // hide有0.2s动画
      setTimeout(() => {
        this.ifNewGroup = false;
      }, 200);
    },
    onGroupClick(item) {
      if (item.edit && item.edit === 1) { //点击了新建分组
        this.ifNewGroup = true;
      } else if (item.edit && item.edit === 2) { //点击了移出分组
        this.moveOutFromGroup(item);
      } else {
        this.moveToGroup(item); //将所有选中的书籍移入被点击的分组
      }
    },
    clear() {
      this.newGroupName = "";
    },
    moveToGroup(group) {
      this.setShelfList(
        this.shelfList.filter((book) => {
          if (book.itemList) {
            // 过滤选中图书
            book.itemList = book.itemList.filter(
              (subBook) => this.shelfSelected.indexOf(subBook) < 0
            );
          }
          return this.shelfSelected.indexOf(book) < 0;
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
    moveOutFromGroup(item) {
      this.moveOutOfGroup(this.onComplete);
    },
    createNewGroup() {
      if (!this.newGroupName || this.newGroupName.length === 0) {
        return;
      }
      if (this.showNewGroup) {
        // 修改分组名称
        this.shelfCategory.title = this.newGroupName;
        this.onComplete();
      } else {
        // 创建新分组
        const group = {
          ids: this.shelfList[this.shelfList.length - 2].ids + 1,
          itemList: [],
          selected: false,
          title: this.newGroupName,
          types: 2,
        };
        let list = removeAddFromShelf(this.shelfList);
        list.push(group);
        list = appendAddToShelf(list);
        this.setShelfList(list).then(() => {
          this.moveToGroup(group);
        });
      }
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
  .dialog-list-item {
    display: flex;
    padding: px2rem(15) 0;
    box-sizing: border-box;
    color: #666;
    &.is-add {
      color: rgb(100, 176, 226);
      &:active {
        color: rgb(166, 198, 219);
      }
    }
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
    width: 100%;
    padding: 0 0 px2rem(30) 0;
    box-sizing: border-box;
    .dialog-input-inner-wrapper {
      display: flex;
      width: 100%;
      padding: px2rem(10) 0;
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
}

.group-dialog-btn-wrapper {
  width: 100%;
  @include center;
}

.dialog-btn {
  flex: 1;
  &.is-empty {
    color: rgba(255, 255, 255, 0.5);
  }
  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
