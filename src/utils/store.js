import { getLocalStorage, setLocalStorage, getBookShelf, saveBookShelf } from './localStorage'


// 加入书架
export function addToShelf(book){
  let shelfList = getBookShelf()
  shelfList = removeAddFromShelf(shelfList) //去掉空的
  book.types = 1
  shelfList.push(book)
  shelfList = computeId(shelfList)
  shelfList = appendAddToShelf(shelfList) //再加上空的
  saveBookShelf( shelfList) //保存到localStorage
  
}
// 从书架移除
export function removeFromBookShelf(book){
  return getBookShelf().filter(item => {
    if(item.itemList){
      item.itemList = removeAddFromShelf(item.itemList)
    }
    return item.name !== book.name
  })
}
export function computeId(list){
  return list.map((book, index) => {
    if(book.types !== 3){
      book.ids = index + 1
      if(book.itemList){
        book.itemList = computeId(book.itemList)
      }
    }
    return book
  })
}

export function gotoBookDetail(vue, book){
  vue.$router.push({
    path: '/store/detail',
    query: { bookId: book.id }
  })
}
export function gotoStoreHome(vue){
  vue.$router.push({
    path: '/store/home'
  })
}

export function appendAddToShelf(list){
  list.push({
    ids: -1,
    types: 3
  })
  return list
}

export function removeAddFromShelf(list){
  return list.filter(item => item.types !== 3)
}

export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 100,
    rotateDegree: 0
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  }
]

export const categoryList = {
  '武侠': {
    typeId: 1,
    img1:'http://qidian.qpic.cn/qdbimg/349573/3258971/150',
    img2:'http://qidian.qpic.cn/qdbimg/349573/1003306811/150'
  },
  '网游':{
    typeId: 2,
    img1:'http://qidian.qpic.cn/qdbimg/349573/1887208/150',
    img2:'https://img1.baidu.com/it/u=2490823398,3958203158&fm=11&fmt=auto&gp=0.jpg'
  },
  '都市': {
    typeId: 3,
    img1:'https://img2.baidu.com/it/u=1058255448,2546329895&fm=26&fmt=auto&gp=0.jpg',
    img2:'https://img1.baidu.com/it/u=1469198532,1738379713&fm=26&fmt=auto&gp=0.jpg'
  },
  '历史': {
    typeId: 4,
    img1:'https://img0.baidu.com/it/u=1633361218,3733847676&fm=26&fmt=auto&gp=0.jpg',
    img2:'https://img0.baidu.com/it/u=442248440,1263154732&fm=253&fmt=auto&app=120&f=JPEG?w=411&h=600'
  },
  '玄幻': {
    typeId: 5,
    img1:'https://img0.baidu.com/it/u=3802571101,3071724873&fm=26&fmt=auto&gp=0.jpg',
    img2:'https://img2.baidu.com/it/u=2053134301,1117134931&fm=26&fmt=auto&gp=0.jpg'
  },
  '其他': {
    typeId: 6,
    img1:'https://img0.baidu.com/it/u=1256871257,3654759602&fm=26&fmt=auto&gp=0.jpg',
    img2:'https://img2.baidu.com/it/u=2513324971,2361514946&fm=26&fmt=auto&gp=0.jpg'
  }, 
}

