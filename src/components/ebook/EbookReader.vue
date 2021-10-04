<template>
  <div class="ebook-reader">
    <div id="read" :style="{backgroundColor: defaultTheme.bgc, color:defaultTheme.color, fontSize:`${defaultFontSize}px`}">
    </div>
    <!-- 在蒙板上绑定事件，用于书签下拉的实现 -->
    <div class="ebook-reader-mask"
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
  getCpt,
  saveCpt,
  getPage,
  savePage,
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
          children:null,
          bookId: '',
          title: '',
          result: '',
          words:'',
          maxpage: 0,
          counts: 0,
          map: [],
          last: false
      }
  },
  watch: {   
    // 切换章节时重新请求
      currentCpt(value) {
        this.getContent()
        this.refresh()
        saveCpt(this.bookId, this.currentCpt)
      },
      currentPage(val, oldVal){
        if(this.result){
          this.children[oldVal].style.display='none'
          this.children[val].style.display='block'
          savePage(this.bookId, this.currentPage)
        }
        this.refresh()
      },
      defaultFontSize(font){
        // 字号改变要重新分页，还要重新渲染
        if(this.result){
          this.$nextTick(this.paginate)
        }
      }
  },
  methods: {
    move(e) {
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
          this.setCurrentPage(this.currentPage-1)
        }else if(this.currentCpt>1){
          this.prevSection()
          this.last = true
        }else return false

        this.hideTitleAndMenu();
      
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        // 点击右侧屏幕
        if(this.currentPage < this.maxpage-1){
          this.setCurrentPage(this.currentPage+1)
        }else if(this.currentCpt<20){
          this.nextSection()

        }else return false
        
        this.hideTitleAndMenu();

      } else {
        this.toggleTitleAndMenu();
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
      }
      this.setMenuVisible(!this.menuVisible);
    },


    paginate(){

      let box = document.getElementById('read')
      let page = document.createElement("div")
      let textNode = document.createTextNode('')                      
      page.appendChild(textNode) 
      box.appendChild(page)

      // 重新分页时要先删掉前面所有子节点，只留page
      // 要倒序删
      for(let k=box.children.length-2;k>=0;k--){
        box.removeChild(box.children[k])
      }

      let text = null
      let i = 0
      this.maxpage = 0
      while(i < this.words.length){
        let text1 = text ? text + '' + this.words[i] : this.words[i] 
        page.firstChild.nodeValue = text1

        if(page.offsetHeight > window.innerHeight-15){
          page.firstChild.nodeValue = text
          box.insertBefore(page.cloneNode(true), page)
          text = null   
          this.maxpage++                    
        }else {               
          text = text1
          i++
        }
      }
      page.firstChild.nodeValue = text
      box.insertBefore(page.cloneNode(true), page)
      this.maxpage++  
      // 记录每一章最大页数
      this.map[this.currentCpt]=this.maxpage

      this.children = box.children
      for(let k=0;k<this.children.length;k++){
        if(k!==this.currentPage)
          this.children[k].style.display='none'
      }
      if(this.currentPage>=this.maxpage){
        this.children[this.maxpage-1].style.display='block'
      }

    },

    setFT(){
      let font = getFontSize(this.bookId)
      if(!font){
        saveFontSize(this.bookId, this.defaultFontSize)
      }else{
        this.setDefaultFontSize(font)
      }
      
      let theme = getTheme(this.bookId)
      if(!theme){
        saveTheme(this.bookId, this.defaultTheme)
      }else{
        this.setDefaultTheme(theme)
      }

      let cpt = getCpt(this.bookId)
      if(!cpt){
        saveCpt(this.bookId, this.currentCpt)
      }else{
        this.setCurrentCpt(cpt)
      }

      let page = getPage(this.bookId)
      if(!page){
        savePage(this.bookId, this.currentPage)
      }else{
        this.setCurrentPage(page)
      }
    },
    // vuex的数据是存储在内存中，页面刷新时，内存将会被释放，所以取不到filename，所以为空
    getContent(){
      getBookContent(this.bookId, this.currentCpt).then(res => {
                    this.title = res.title;
                    this.result=res
                    this.words = res.content.replace(/-/g,'').split('')

                    // 分页
                    this.paginate()
                }).then(()=>{
                  if(this.last){
                    this.setCurrentPage(this.map[this.currentCpt])
                    this.last = false
                  }else this.setCurrentPage(0)
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
  mounted() {
    this.bookId = this.$route.params.bookId;
    this.setFileName(this.bookId)
    this.setFT()
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
    padding: 15px;
    line-height:30px;
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