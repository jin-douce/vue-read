export function computeId(list){
  return list.map((book, index) => {
      book.ids = index + 1
      if(book.itemList){
        book.itemList = computeId(book.itemList)
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
    img1:'https://www.xbiquge.la/files/article/image/43/43943/43943s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/44/44820/44820s.jpg'
  },
  '网游':{
    typeId: 2,
    img1:'https://www.xbiquge.la/files/article/image/72/72575/72575s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/79/79721/79721s.jpg'
  },
  '玄幻': {
    typeId: 3,
    img1:'https://www.xbiquge.la/files/article/image/0/8/8s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/39/39017/39017s.jpg'
  },
  '穿越': {
    typeId: 4,
    img1:'https://www.xbiquge.la/files/article/image/28/28056/28056s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/1/1690/1690s.jpg'
  },
  '都市': {
    typeId: 5,
    img1:'https://www.xbiquge.la/files/article/image/29/29770/29770s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/63/63436/63436s.jpg'
  },
  '科幻': {
    typeId: 6,
    img1:'https://www.xbiquge.la/files/article/image/11/11433/11433s.jpg',
    img2:'https://www.xbiquge.la/files/article/image/26/26136/26136s.jpg'
  }, 
}

