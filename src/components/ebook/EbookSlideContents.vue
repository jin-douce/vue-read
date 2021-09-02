<template>
  <div class="ebook-slide-contents">
    <scroll class="slide-contents-list" :top="154" :bottom="48" v-show="!searchVisible">
        <div class="slide-contents-item" v-for="(item, index) in lists" :key="index">
            <span class="slide-contents-item-label" :class="{'selected': currentCpt === index+1}"
              @click="displayContent(index)">{{item}}</span>
            <!-- <span class="slide-contents-item-page">{{item.page}}</span> -->
        </div>      
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'
import { getTitleList } from '../../api/store'
export default {
  mixins: [ebookMixin],
  components: {
      Scroll
  },
  data(){
      return {
        lists:[],
        searchVisible: false,
        searchList: null,
        searchText: ''
      }
  },
  methods: {
      search(){
          if(this.searchText && this.searchText.length > 0){
            this.doSearch(this.searchText).then(list => {
                this.searchList = list
                this.searchList.map(item => {
                    item.excerpt = item.excerpt.replace(this.searchText, 
                    `<span class="content-search-text">${this.searchText}</span>`)
                    return item
                })
            })
          }
      },
      doSearch(q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            item => item.load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      },
      
      displayContent(index){
        this.hideTitleAndMenu()
        this.setCurrentCpt(index+1)
      },
 
      // 点击搜索框获取焦点，允许搜索
      showSearchPage(){
          this.searchVisible = true
      },
      hideSearchPage(){
          this.searchVisible = false
          this.searchText = ''
          this.searchList = null
      }
  },
  created() {
      getTitleList(this.fileName).then(res => {
          this.lists = res.titles.split('-')
      })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;
        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          font-size: px2rem(12);
          @include center;
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .slide-contents-book-title {
          // width: px2rem(153.75);
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include left;
          .slide-contents-book-title-text {
            @include ellipsis2(3);
          }
        }
        .slide-contents-book-author {
          // width: px2rem(153.75);
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-top: px2rem(5);
          @include left;
          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
          }
          .progress-text {
            font-size: px2rem(12);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          margin-top: px2rem(5);
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
        .selected{
          color: rgb(100, 186, 236);
          font-weight: bold;
        }
        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right;
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>