<template>
  <div class="ebook-bookmark" ref="bookmark">
      <div class="ebook-bookmark-text-wrapper">
          <div class="ebook-bookmark-down-wrapper" ref="iconDown">
              <span class="icon-down2"></span>
          </div>
          <div class="ebook-bookmark-text">{{text}}</div>
      </div>
      <div class="bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
          <book-mark :color="color" :width="15" :height="35"></book-mark>
      </div>
  </div>
</template>
 
<script>
import { getBookmark, saveBookmark } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
import { realPx } from '../../utils/utils'
import BookMark from '../common/Bookmark'
const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
    mixins: [ebookMixin],
    data(){
        return {
            text: '',
            color: WHITE,
            isFixed: false
        }
    },
    components: {
        BookMark
    },
    computed: {
        // 书签 高度
        height(){
            return realPx(35)
        },
        // 成功增加/删除书签的临界值
        threshold(){
            return realPx(55)
        },
        fixedStyle(){
            return {
                position: 'fixed',
                top: 0,
                right: `${(window.innerWidth - this.$refs.bookmark.clientWidth)/2}px`
            }
        }
    },
    watch: {
        offsetY(v){
            if(this.menuVisible || this.settingVisible >= 0){
                return
            }
            if(v >= this.height && v < this.threshold){
                this.beforeThreshold(v)
            }else if(v >= this.threshold){
                this.afterThreshold(v)
            }else if(v > 0 && v < this.height){
                this.beforeHeight()
            }else if(v === 0){
                this.restore()
                
            }
        },
        isBookmark(isBookmark) {
        this.isFixed = isBookmark
        if (isBookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    
    methods: {
      addBookmark () {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
            this.bookmark = []
        }
        const text = this.fileName+'-Cpt'+this.currentCpt+'-'+this.currentPage
        this.bookmark.push({
          Cpt: this.currentCpt,
          Page: this.currentPage,
          text: text
        })
        saveBookmark(this.fileName, this.bookmark)
        
      },
      removeBookmark(){
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          saveBookmark(this.fileName, this.bookmark.filter(
            item => item.Cpt !== this.currentCpt && item.Page !== this.currentPage))
          this.setIsBookmark(false)
        }
      },
      restore(){
        // 状态4：归位
        setTimeout(() => {
            this.$refs.bookmark.style.top = `${-this.height}px`
            this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }, 200)
        if(this.isFixed){
            this.setIsBookmark(true)
            this.addBookmark()
        }else{
            this.setIsBookmark(false)
            this.removeBookmark()
        }     
      },
      beforeHeight(){
        if(this.isBookmark){
            this.text = '下拉删除书签'
            this.color = BLUE
            this.isFixed = true
        }else{
            this.text = '下拉添加书签'
            this.color = WHITE
            this.isFixed = false
        }       
      },
      beforeThreshold(v){
          // 状态2：未到达临界状态
          this.$refs.bookmark.style.top = `${-v}px`
          this.beforeHeight()
          const iconDown = this.$refs.iconDown
          if(iconDown.style.transform === 'rotate(180deg)'){
            iconDown.style.transform = 'rotate(0deg)'
          }
        },
        afterThreshold(v){
          // 状态3：超过临界状态
          this.$refs.bookmark.style.top = `${-v}px`
          if(this.isBookmark){
            this.text = '松手删除书签'
            this.color = WHITE
            this.isFixed = false
          }else{
            this.text = '松手添加书签'
            this.color = BLUE
            this.isFixed = true
          }
          const iconDown = this.$refs.iconDown
          if(iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)'){
            iconDown.style.transform = 'rotate(180deg)'
          }
          
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        display: flex;
        .ebook-bookmark-down-wrapper{
            font-size: px2rem(14);
            color: white;
            transition: all .2s linear;
            @include center;
        }
        .ebook-bookmark-text{
            font-size: px2rem(14);
            color: white;
        }
    }
    .bookmark-icon-wrapper{
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(10);
    }
  } 

</style>