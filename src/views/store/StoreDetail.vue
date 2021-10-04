<template>
  <div class="book-detail" v-if="book!==null">
    <detail-title @back="back" :showShelf="true" ref="title"></detail-title>

    <scroll class="content-wrapper" :top="42" :bottom="52" @onScroll="onScroll" ref="scroll">
      <book-info
        :cover="book.images"
        :title="book.name"
        :author="book.author"
        :desc="book.type"
      ></book-info>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">简介</div>
        <div class="book-detail-content-text">{{ book.intro }}</div>
      </div>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">目录</div>
        <div class="book-detail-content-item"
              v-for="(item, index) in lists" :key="index" @click="readBook(index+1)">
            <div class="book-detail-content-text">
                {{ item}}
            </div>
        </div>
      </div>
    </scroll>

    <div class="bottom-wrapper">
      <div class="bottom-btn" @click.stop.prevent="readBook()">开始阅读</div>
      <div class="bottom-btn" @click.stop.prevent="addOrRemoveShelf()">
        <span class="icon-selected" v-if="inBookShelf"></span>
        {{ inBookShelf ? '已在书架' : '加入书架'}}
      </div>
    </div>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailTitle from "../../components/detail/DetailTitle";
import BookInfo from "../../components/detail/BookInfo";
import Scroll from "../../components/common/Scroll";
import Toast from "../../components/common/Toast";
import { getBook,getTitleList } from "../../api/store";
import { px2rem, realPx } from "../../utils/utils";
import { computeId } from "../../utils/store";
import { getBookShelf, saveBookShelf } from "../../utils/localStorage";
import { ebookMixin, storeShelfMixin } from "../../utils/mixin";


export default {
  mixins: [storeShelfMixin, ebookMixin],
  components: {
    DetailTitle,
    Scroll,
    BookInfo,
    Toast,
  },
   data() {
    return {
      lists:[],
      book: null,
      toastText: "",
    };
  },
  computed: {  
    inBookShelf() {
      if (this.book && this.shelfList.length) {
        const flatShelf = this.flatten(this.shelfList).filter(item => item.types === 1);
        const book = flatShelf.filter(item => item.name === this.book.name);
        return book && book.length > 0;
      } else return false;
    },
  },
 
  methods: {
    flatten(arr) {
      let  a = arr.map(v => v.itemList ? [v, ...v.itemList] : v)
      return [].concat(...a);
    },
    addOrRemoveShelf() {
      if (this.inBookShelf) {
        this.removeFromShelf(this.book)
        this.setShelfList(getBookShelf())
      } else {
        this.addToShelf(this.book);
        this.setShelfList(getBookShelf());//更新vuex
      }
    },
    // 加入书架
    addToShelf(book){
      book.types = 1
      let shelfList = getBookShelf()
      shelfList.push(book)
      shelfList = computeId(shelfList)
      saveBookShelf(shelfList) //保存到localStorage
    },
    
    // 从书架移除
    removeFromShelf(book){
      let shelfList = getBookShelf().filter(item => {
        if(item.itemList){
          item.itemList = item.itemList.filter(item => item.name !== book.name)
        }
        return item.name !== book.name
      })
      saveBookShelf(shelfList)
    },
    showToast(text) {
      this.toastText = text;
      this.$refs.toast.show();
    },
    readBook(cpt=1) {    
        
      this.$router.push({
        path: `/ebook/${this.book.id}`
      });
      this.setCurrentCpt(cpt)
      this.setCurrentPage(0)
    },
    back() {
      this.$router.go(-1);
    },

    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow();
      } else {
        this.$refs.title.hideShadow();
      }
    },
  },
  created() {
    // const userid = JSON.parse(localStorage.getItem('userInfo')).id
    const bookid = this.$route.query.bookId
    this.setFileName(bookid)

    getBook(bookid).then(res => {
          this.book = res;        
      })

    getTitleList(bookid).then(res => {
          this.lists = res.titles.split('-').slice(0,20)
          this.setTitleList(this.lists)
    })

    if (!this.shelfList.length) {
      this.getShelfList();
    }
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.book-detail {
  width: 100%;
  background: white;
  .content-wrapper {
    width: 100%;
    .book-detail-content-wrapper {
      width: 100%;
      border-bottom: px2rem(1) solid #eee;
      box-sizing: border-box;
      .book-detail-content-title {
        font-size: px2rem(20);
        font-weight: bold;
        padding: px2rem(20) px2rem(15) px2rem(10) px2rem(15);
        box-sizing: border-box;
      }
      .book-detail-content-text {
        padding: px2rem(10) px2rem(15) px2rem(10) px2rem(15);
        font-size: px2rem(16);
        line-height: 125%;
        color: rgb(110, 109, 109);
      }

    }

  }
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(52);
    box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, 0.1);
    .bottom-btn {
      flex: 1;
      color: rgb(75, 159, 238);
      font-size: px2rem(16);
      font-weight: bold;
      
      @include center;
      &:active {
        color: rgb(75, 159, 238);
      }
      .icon-check {
        margin-right: px2rem(5);
      }
    }
    &.hide-shadow {
      box-shadow: none;
    }
  }
}
</style>
