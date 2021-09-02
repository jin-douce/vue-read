<template>
  <div class="ebook-reader">
    <div id="read" :style="{backgroundColor: defaultTheme.bgc, color:defaultTheme.color}">
      <p id="p" v-for="(item, index) in contents[currentPage]" :key="index" 
          :style="{fontSize: `${defaultFontSize}px`}">
        {{item}}
      </p>
    </div>
<!-- 在蒙板上绑定事件，用于书签下拉的实现 -->
    <div
      class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getBookmark
} from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
import { getBookContent } from '../../api/store'

export default {
  mixins: [ebookMixin],
  data() {
      return {
          bookId: '',
          title: '',
          contents: [],
          maxpage: 0,
          counts: 0,
      }
  },
  watch: {   
    // 切换章节时重新请求
      currentCpt(value) {
        this.getContent()
        this.refresh()
      },
      currentPage(val){
        this.refresh()
      },
      defaultFontSize(font){
        this.getContent()
      }
  },
  methods: {
    move(e) {
      // console.log(e);
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    moveEnd(e) {
      // console.log(e);
      // this.$store.dispatch('setOffsetY', 0)
      this.firstOffsetY = 0;
      this.setOffsetY(0);
    },
    onMouseEnter(e) {
      // 鼠标进入
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp;
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      // 鼠标移动
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0);
        this.firstOffsetY = null;
        this.mouseState = 3;
      } else {
        this.mouseState = 4;
      }
      const time = e.timeStamp - this.mouseStartTime;
      if (time < 100) {
        this.mouseState = 4;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    // 蒙板点击事件
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return;
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) {
        // 点击屏幕左侧
        if(this.currentPage>0){
          this.prevPage()
        }else if(this.currentCpt>1){
          this.preCpt()
          this.setCurrentPage(0)
        }else return false

        this.hideTitleAndMenu();
      
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        // 点击右侧屏幕
        if(this.currentPage < this.maxpage){
          this.nextPage()
        }else if(this.currentCpt<20){
          this.nextCpt()
          this.setCurrentPage(0)

        }else return false
        
        this.hideTitleAndMenu();

      } else {
        this.toggleTitleAndMenu();
      }
    },

    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },

    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
 
    lengthOf(arr){
      let len=0
      arr.forEach(item => len += item.length)
      return len
    },
    getContent(){
      // 分页
      this.contents = []
      getBookContent(this.bookId, this.currentCpt).then(res => {
                    this.title = res.title;
                    const sections = res.content.split('-')
                    let len
                    if(this.defaultFontSize===14){
                      len = 450 * (window.innerWidth /375 ) 
                    }else if(this.defaultFontSize===16){
                      len = 350 * (window.innerWidth /375 ) 
                    }else if(this.defaultFontSize===18){
                      len = 250 * (window.innerWidth /375 ) 
                    }else if(this.defaultFontSize===20){
                      len = 180 * (window.innerWidth /375 ) 
                    }else{
                      len = 150 * (window.innerWidth /375 ) 
                    }
                    while(sections.length){
                      const page = []
                      do{
                        page.push(sections.shift())
                      } while(sections.length && this.lengthOf(page) < len)
                      this.contents.push(page)
                    }   
                    this.maxpage = this.contents.length

                    let font = getFontSize(this.fileName)
                    if(!font){
                      saveFontSize(this.fileName, this.defaultFontSize)
                    }else{
                      this.setDefaultFontSize(font)
                    }
                    
                    let theme = getTheme(this.fileName)
                    if(!theme){
                      saveTheme(this.fileName, this.defaultTheme)
                    }else{
                      this.setDefaultTheme(theme)
                    }
                })
    },
    refresh(){
      // 判断是否是书签页
      const bookmark = getBookmark(this.fileName)
      if (bookmark) {
        if (bookmark.some(item => item.Cpt === this.currentCpt && item.Page === this.currentPage)) {
          this.setIsBookmark(true)
        } else {
          this.setIsBookmark(false)
        }
      } else {
        this.setIsBookmark(false)
      }
    },
    
  },
  created() {
    this.bookId = this.$route.params.bookId;
    this.getContent()
    
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  #read {
    height: 100%;
    padding: 10px;

    #p {
      line-height: 150%;
    }
  }

  .ebook-reader-mask {
    position: absolute;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>