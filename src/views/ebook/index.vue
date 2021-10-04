<template>
  <div class="ebook" ref="ebook">
    <!-- 组件都是绝对定位 -->
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-bookmark></ebook-bookmark>
  </div> 
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookBookmark from '../../components/ebook/EbookBookmark'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
export default {
    mixins: [ebookMixin],
    components: {
        EbookReader,
        EbookTitle,
        EbookMenu,
        EbookBookmark,
    },
    watch:{
      offsetY(v){
        if(!this.menuVisible){
           if(v > 0){
            this.move(v)
          }else if(v === 0){
            this.restore() 
          }
        }
      }
    },
    methods: {
      restore(){
        this.$refs.ebook.style.top = 0
        this.$refs.ebook.style.transition = 'all .2s linear' //归位时加上过渡动画
        // 0.2s后即归位完成后要清除，否则下次往下拉时也会有动画
        setTimeout(() => {
          this.$refs.ebook.style.transition = ''
        }, 200)
      },
      move(v){
        this.$refs.ebook.style.top = v + 'px'
      },
      // 记录阅读时间
      startLoopReadTime(){
        let readTime = getReadTime(this.fileName)
        if(!readTime){
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++
          // 每半分钟保存一次时间
          if(readTime % 30 === 0){
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted() {
      this.startLoopReadTime()
    },
    beforeDestroy(){
      if(this.task){
        clearInterval(this.task)
      }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/global';
  .ebook {
    // 绝对定位，下拉时通过改变top实现
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  } 
</style>