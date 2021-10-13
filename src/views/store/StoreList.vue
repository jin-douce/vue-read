<template>
<!-- 书籍列表 -->
  <div class="book-list-wrapper">
    <detail-title :title="title" :showShelf="true" @back="back" ref="title"></detail-title>
    <scroll class="book-list-scroll-wrapper" :top="42" @onScroll="onScroll"  ref="scroll">
      
      <div v-for="(item, index) in list" :key="index">
        <router-link :to="{path:'/store/detail',query:{bookId:item.id}}">
            <book-info
            :cover="baseUrl+'/images/'+item.id+'.jpg'"
            :title="item.name"
            :author="item.author"
            :desc="item.type"
          ></book-info>
        </router-link>
      </div>
    </scroll>
  </div>
</template>

<script>
  import BookInfo from '../../components/detail/BookInfo.vue'
  import DetailTitle from '../../components/detail/DetailTitle'
  import Scroll from '../../components/common/Scroll'
  import {getBookType, search} from '../../api/store'
  import { realPx } from '../../utils/utils'
  import { categoryList, categoryText } from '../../utils/store'

  export default {
    components: {
      DetailTitle,
      Scroll,
      BookInfo
    },
    computed: {
      title() {
        if (this.list) {
          return this.total && '共 $1 本图书'.replace('$1', this.totalNumber)
        } else {
          return null
        }
      },
      totalNumber() {
        let num = 0
        Object.keys(this.list).forEach(key => {
          num += this.list[key].length
        })
        return num
      }
    },
    data() {
      return {
        list: null,
        total: null,
        baseUrl: process.env.VUE_APP_BOOK_URL
      }
    },
    methods: {
      getCategoryText(key) {
        return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
      },
      back() {
        this.$router.go(-1)
      },
      onScroll(offsetY) {
        if (offsetY > realPx(42)) {
          this.$refs.title.showShadow()
        } else {
          this.$refs.title.hideShadow()
        }
      },
      getList() {
          const category = this.$route.query.categoryText
          const keyword = this.$route.query.keyword
          if (category) {
            getBookType(category).then(res => {
              this.list = res
            })
          } else if (keyword) {
            search(keyword).then(res => {
              this.list = res;
            })
          }  
      }
    },
    created() {
      this.getList() 
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .book-list-wrapper {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
