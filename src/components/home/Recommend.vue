<template>
  <div class="recommend">
    <title-view label="热门小说" v-if="type===1"></title-view>
    <title-view label="精品推荐" v-else></title-view>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in data" :key="index">
        <router-link :to="{path:'/store/detail', query:{bookId: item.id}}">
          <div class="img-wrapper">
            <img class="img" :src="item.images">
          </div>
          <div class="content-wrapper">
            <div class="title" ref="title">{{item.name}}</div>
            <div class="num" ref="num">{{item.author}}</div>
          </div>
        </router-link>        
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleView from './Title'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    
    components: {
      TitleView
    },
    props: {
      data: Array,
      type: Number
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .recommend {
    .recommend-list {
      width: 100%;
      @include top;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      .recommend-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(5);
        box-sizing: border-box;
        .img-wrapper {
          @include center;
          .img {
            width: 80%;
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);
          @include columnCenter;
          .title {
            text-align: center;
          }
          .num {
            margin-top: px2rem(5);
            font-size: px2rem(14);
          }
        }
      }
    }
  }
</style>
