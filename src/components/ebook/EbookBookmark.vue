<template>
  <div class="ebook-bookmark" ref="bookmark">
      <div class="bookmark-text">{{text}}</div>
      <div class="bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
        <div class="icon-bookmark"></div>
      </div>
  </div>
</template>
 
<script>
import { getBookmark, saveBookmark } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
import { realPx, px2rem } from '../../utils/utils'

export default {
    mixins: [ebookMixin],
    data(){
        return {
            text: '',
            isFixed: false
        }
    },
    computed: {
        // 书签高度
        height(){
            return realPx(35)
        },
        fixedStyle(){
            return {
                position: 'fixed',
                top: 0,
                right: 0,
                
            }
        }
    },
    watch: {
        offsetY(v){
            if(this.menuVisible || this.settingVisible >= 0){
                return
            }
            if(v >= this.height){
                this.afterHeight(v)
            }else if(v > 0 && v < this.height){
                this.beforeHeight()
            }else if(v === 0){
                this.restore()                
            }
        },
        isBookmark(isBookmark) {
          this.isFixed = isBookmark
          
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
            item => item.Cpt !== this.currentCpt || item.Page !== this.currentPage))
          this.setIsBookmark(false)
        }
      },
      restore(){
        // 归位
        setTimeout(() => {
            this.$refs.bookmark.style.top = `${-this.height}px`
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
            this.isFixed = true
        }else{
            this.text = '下拉添加书签'
            this.isFixed = false
        }       
      },
      afterHeight(v){
          // 到达高度
          this.$refs.bookmark.style.top = `${-v}px` //相对位移，看起来就是静止的
          if(this.isBookmark){
            this.text = '松手删除书签'
            this.isFixed = false
          }else{
            this.text = '松手添加书签'
            this.isFixed = true
          }
          
      },
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
    .bookmark-text{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        font-size: px2rem(14);
        color: black;
    }
    .bookmark-icon-wrapper{
      position: absolute;
      right: 0;
      bottom: 0;    
      height: px2rem(35);
      .icon-bookmark {
        font-size: px2rem(35);
      }
    }
  } 

</style>