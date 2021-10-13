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
import Category from "../../components/home/Category";

export default {
  mixins: [storeHomeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    Recommend,
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
      link: [34, 38, 44, 48],
      list:[
        'http://47.93.40.207/images/01.jpg',
        'http://47.93.40.207/images/02.jpg',
        'http://47.93.40.207/images/03.jpg',
        'http://47.93.40.207/images/04.jpg',  
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
          if (index > 1 && index < 5) 
            arr.push(item)
      })
      return arr
    },
    good(value) {
      if (!value) return ''
      var arr = []
      value.forEach((item, index) => {   
          if (index > 4 && index < 8) 
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
      img {
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

        li {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
        }
        li.active {
            background: rgb(243, 167, 26);
        }
      }
  }

  .recommend {
    margin-top: px2rem(20);
  }

  .categories {
    margin-top: px2rem(20);
  }
}
</style>