import { mapGetters, mapActions } from 'vuex'
import { getBookShelf, saveBookShelf } from './localStorage'
import { getReadTimeByMinute } from './book'
import { gotoBookDetail, appendAddToShelf,removeAddFromShelf, computeId } from './store'
import { getShelf } from "../api/store";

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory', //当前所在分组
      'currentType', //当前位于书架还是分组内
      'userInfo',
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType',
      'setUserInfo'
    ]),

    // 获取名称为title的分组
    getCategory(title){
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(
          book => book.types === 2 && book.title === title)[0]  
          this.setShelfCategory(categoryList) 
      })
    },

    // 获取书架的所有
    getShelfList() {
      // 先尝试从localstorage获取
      let shelfList = getBookShelf();
      if(!shelfList){
        shelfList = []
        saveBookShelf([])
      }
      return this.setShelfList(shelfList);
      // 如果不存在，则获取接口数据
      // if (!shelfList) {
      //   console.log('从数据库请求');
      //   getShelf(JSON.parse(localStorage.getItem('userInfo')).id).then(res => {
      //     console.log('请求结果：',res);
      //     // 在最后加一个空的
      //     shelfList = appendAddToShelf(res);
      //     // 保存到LocalStorage
      //     saveBookShelf(shelfList);
      //     // 保存到vuex,返回promise对象
      //     return this.setShelfList(shelfList);
      //   })
        
      // } else {
      //   // 如果已存在，则不用从后端请求，缓存到vuex
      //   return this.setShelfList(shelfList);
      // }
    },
    
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail(book){
      // 路由跳转
      gotoBookDetail(this, book)
    }
  }
}
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'titleList',
      'currentPage',
      'currentCpt',
      'defaultFontSize',
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultTheme',
      'offsetY',
      'isBookmark',
    ]),
    
  },
  methods: {
    ...mapActions([
      'setTitleList',
      'setCurrentPage',
      'setCurrentCpt',
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultTheme',
      'setOffsetY',
      'setIsBookmark',
    ]),
   
    hideTitleAndMenu(){
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    }, 
    getReadTimeText(){
      return '已读$1分钟'.replace('$1', getReadTimeByMinute(this.fileName))
    },
    prevSection(){
      if(this.currentCpt > 1){
        this.setCurrentCpt(this.currentCpt - 1)
      }
    },
    nextSection(){
      if(this.currentCpt < 20){
        this.setCurrentCpt(this.currentCpt + 1)
      }
      
    },
  }
}