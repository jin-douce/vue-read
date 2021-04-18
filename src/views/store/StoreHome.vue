<template>
  <div class="store-home">
      <search-bar></search-bar>
      <flap-card></flap-card>
      <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
          <div>111111111</div>
      </scroll>
  </div>
</template>

<script>
import Scroll from '../../components/common/Scroll.vue'
import SearchBar from '../../components/home/SearchBar'
import FlapCard from '../../components/home/FlapCard'
import { storeHomeMixin } from '../../utils/mixin';
export default {
  mixins: [storeHomeMixin],
  components: {
      SearchBar,
      Scroll,
      FlapCard
  },
  data() {
    return {
      scrollTop: 94
    }
  },
  methods: {
    // scroll组件接收和处理偏移量，外层组件通过调用setOffsetY捕捉偏移量
      onScroll(offsetY){
        this.setOffsetY(offsetY)
        if(offsetY > 0){
          this.scrollTop = 52
        }else{
          this.scrollTop = 94
        }
        // 更新混动条
        this.$refs.scroll.refresh()
      }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/global';
  .store-home {
    width: 100%;
    height: 100%;
  }

</style>