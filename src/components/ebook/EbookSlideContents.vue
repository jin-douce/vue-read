<template>
  <div class="ebook-slide-contents">
    <scroll class="slide-contents-list" :top="48" :bottom="4">
        <div class="slide-contents-item" v-for="(item, index) in lists" :key="index" @click="displayContent(index)">
            <div class="slide-contents-item-label" :class="{'selected': currentCpt === index+1}">
              {{item}}
            </div>
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
      }
  },
  methods: {    
      displayContent(index){
        this.hideTitleAndMenu()
        this.setCurrentPage(0)
        this.setCurrentCpt(index+1)
      },

  },
  created() {
      getTitleList(this.fileName).then(res => {
          this.lists = res.titles.split('-').slice(0,20)
      })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    height: 100%;
    width: 100%;
    font-size: 0;

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

      }
    }
  }
</style>