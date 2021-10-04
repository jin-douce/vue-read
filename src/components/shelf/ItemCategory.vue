<template>
<!-- 书架分组(打开前的小图标 九宫格) -->
  <div class="item-category" v-if="data.itemList.length>0">
      <div class="item-category-item" v-for="(item, index) in data.itemList" :key="index">
        <img class="item-category-img" :src="item.images" />
      </div>
  </div>
  <div class="item-category-bg" v-else>
    <span class="item-category-del">空分组</span>
  </div>
</template>
 
<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.item-category {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    padding-top: px2rem(5);
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid rgb(192, 189, 189);
    .item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      padding: 0 px2rem(2.5) px2rem(5) px2rem(2.5);
      box-sizing: border-box;
     
      .item-category-img {
        width: 100%;
        height: 100%;
      }
    }
  }
.item-category-bg {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(192, 189, 189);
  @include center;
  .item-category-del {
    
    color: rgb(156, 154, 154);
    font-size: px2rem(14);
  }
}
  
</style>
