<template>
<!-- 书城首页 -->
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">

      <div class="container">
        <img :src="item" v-for='(item,i) in list' :key="i" v-show='i===activeIndex' @click="toLink(i)">
        <ul class="menu">
            <li @mouseenter='hover(i)' :class="{active:i===activeIndex}" 
            v-for='(item,i) in list' :key="i"></li>
        </ul>
    </div>

      <recommend :type="type1" :data="bookList | hot" class="recommend"></recommend>
      <recommend :type="type2" :data="bookList | good" class="recommend"></recommend>
      <!-- 分类列表 -->
      <!-- <div
        class="category-list-wrapper"
        v-for="(item, index) in categoryList"
        :key="index"
      >
        <category-book :data="item"></category-book>
      </div> -->
      <!-- 所有分类 -->
      <category class="categories"></category>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll.vue";
import SearchBar from "../../components/home/SearchBar";
import FlapCard from "../../components/home/FlapCard";
import { storeHomeMixin } from "../../utils/mixin";
import { getBookList } from "../../api/store";
import Recommend from "../../components/home/Recommend";
// import CategoryBook from "../../components/home/CategoryBook";
import Category from "../../components/home/Category";

export default {
  mixins: [storeHomeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    Recommend,
    // CategoryBook,
    Category,
  },
  data() {
    return {
      type1:1,
      type2:2,
      bookList: [],
      scrollTop: 94,
      random: null,
      recommend: null,
      categoryList: null,
      categories: null,
      link: [34, 174, 120, 110],
      list:[
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.A2J2SvJoo7Z1M7tiddeDRQHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C._QYc9dd2xFGMvCIUjbislAHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://tse2-mm.cn.bing.net/th/id/OIP-C.HIRVRrmINf3fz2GNh_cXBQHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.LVTnEftKLyj6ZqhJ-TTMnQHaEo?w=265&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
      timer: null,
      activeIndex: 0,
    };
  },

  filters:{
    hot(value) {
      if (!value) return ''
      var arr = []
      value.forEach((item, index) => {   
          if (index > 10 && index < 14) 
            arr.push(item)
      })
      return arr
    },
    good(value) {
      if (!value) return ''
      var arr = []
      value.forEach((item, index) => {   
          if (index > 7 && index < 11) 
            arr.push(item)
      })
      return arr
    },
  },
  methods: {
    // scroll组件接收和处理偏移量，外层组件通过调用setOffsetY捕捉偏移量
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      // 更新混动条
      this.$refs.scroll.refresh();
    },
    toLink(i){
      this.$router.push({
        path: '/store/detail',
        query: { bookId: this.link[i] }
      })
    },
    run() {
      this.timer = setInterval(() => {
          this.activeIndex++;
          if (this.activeIndex === this.list.length) this.activeIndex = 0;
      }, 2000)
    },
    hover(i) {
      clearInterval(this.timer);
      this.activeIndex = i;
      this.run();
    }
  },
  mounted() {
    getBookList().then(res => {
      this.bookList = res;
      const randomIndex = Math.floor(Math.random() * res.length);
      this.random = res[randomIndex];
    })
    this.run();
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-home {
  width: 100%;
  height: 100%;


        .container {
            width: 100%; 
            position: relative;
            display: flex;
            justify-content: center;
            margin-top: px2rem(10);
            // background-color: rgb(217, 252, 185);
        }

        .container img {
            // width: px2rem(355);
            width: 95%;
            height: px2rem(210);

        }

        .menu {
            width: 100px;
            position: absolute;
            bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .menu li {
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
        }

        .menu li.active {
            background: rgb(243, 167, 26);
        }


  .recommend {
    margin-top: px2rem(20);
  }
  
  .category-list-wrapper {
    margin-top: px2rem(20);
  }
  .categories {
    margin-top: px2rem(20);
  }
}
</style>