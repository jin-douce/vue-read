import { mapGetters, mapActions } from 'vuex'
import { getBookmark, saveLocation, getBookShelf, saveBookShelf } from './localStorage'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
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
    showBookDetail(book){
      gotoBookDetail(this, book)
    },

    // 获取名称为title的分组
    getCategoryList(title){
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(
          book => book.types === 2 && book.title === title)[0]
          this.setShelfCategory(categoryList) //设置当前所在分组
      })
    },

    // 获取书架的所有
    getShelfList() {
      // 先尝试从localstorage获取
      let shelfList = getBookShelf();
      if(!shelfList){
        shelfList = appendAddToShelf([])
        saveBookShelf(shelfList)
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
    moveOutOfGroup(f){
      this.setShelfList(
        this.shelfList.map((book) => {
          if (book.types === 2 && book.itemList) {
            // 只保留未选中的图书
            book.itemList = book.itemList.filter(
              (subBook) => !subBook.selected
            );
          }
          return book;
        })
      ).then(() => {
        let list = [].concat(
          removeAddFromShelf(this.shelfList),
          ...this.shelfSelected
        );
        list = computeId(appendAddToShelf(list));
        this.setShelfList(list).then(() => {
          this.simpleToast('成功移出');
          if(f) f()
        });
      });
    }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
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
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'offsetY',
      'isBookmark',
    ]),
    // 写成计算属性不会频繁调用
    // themeList() {
    //   return themeList(this)
    // },
    
  },
  methods: {
    ...mapActions([
      'setTitleList',
      'setCurrentPage',
      'setCurrentCpt',
      'preCpt',
      'nextCpt',
      'prevPage',
      'nextPage',
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setOffsetY',
      'setIsBookmark',
    ]),
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          
          addCss('@/assets/theme/theme_default.css')
          break
        case 'Eye':
          addCss('@/assets/theme/theme_eye.css')
          break
        case 'Gold':
          addCss('@/assets/theme/theme_gold.css')
          break
        case 'Night':
          addCss('@/assets/theme/theme_night.css') 
          break
        default:
          addCss('@/assets/theme/theme_default.css')
          break
      }
    },
   

    hideTitleAndMenu(){
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    }, 
    getReadTimeText(){
      return '已读$1分钟'.replace('$1', getReadTimeByMinute(this.fileName))
    },
  }
}