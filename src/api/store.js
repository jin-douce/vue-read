import axios from 'axios'
import { setLocalForage } from '../utils/localForage'


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.interceptors.response.use(response => {
  return response.data;
})

// 获取所有
export function getBookList(){
  return axios({
    method: 'get',
    url: '/booklist'
  })
}

// 获取某一本的信息
export function getBook(id){
  return axios({
    method: 'get',
    url: `/booklist?id=${id}`
  }) 
}

// 获取某一本某一章节内容
export function getBookContent(book, chapter){
  return axios({
    method: 'get',
    url: `/book?book=${book}&id=${chapter}`
  }) 
}
 
// 获取目录 
export function getTitleList(id){
  return axios({
    method: 'get',
    url: `/booktitles?id=${id}`
  }) 
}

// 获取某一类
export function getBookType(type){
  return axios({
    method: 'get',
    url: `/type?type=${type}`
  }) 
}

// 获取书架
export function getShelf(userId){
  return axios({
    method: 'get',
    url: `/shelf?userId=${userId}`
  })
}

// 加入书架
export function postShelf(userId, userInfo){
  return axios({
    method: 'post',
    url: '/inShelf',
    data: {
      userId: userId,
      userInfo: userInfo
    } 
  })
}

// 检查是否在书架
export function checkShelf(userId, bookId){
  return axios({
    method: 'get',
    url: `/checkShelf?userId=${userId}&bookId=${bookId}`
  })
}

// 搜索 
export function search(keyword){
  return axios({
    method: 'get',
    url: '/search',
    params: {
      keyword: keyword
    }
  })
}

// 获取最近阅读记录
export function getLate(userId, bookId){
  return axios({
    method: 'get',
    url: '/late',
    params: {
      userId: userId,
      bookId: bookId
    }
  })
}
// 添加到最近阅读记录
export function postLately(userId, bookId, chapterId){
  return axios({
    method: 'post',
    url: '/lately',
    data: {
      userId: userId,
      bookId: bookId,
      chapterId: chapterId
    }
  })
}

// 登录
export function login(username, password){
  return axios({
    method: 'post',
    url: '/login',
    data: {
      user: username,
      pwd: password
    }
  })
}

// 注册
export function register(params){
  return axios({
    method: 'post',
    url: '/register',
    data: params
  })
}
export function download(book, onSuncess, onError, onProgress){
  if(!onProgress){
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180*1000,
    onDownloadProgress: progressEvent => {
      if(onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
    const blob = new Blob([res.data])
    setLocalForage(book.fileName, blob, () => {
      if(onSuncess) onSuncess(book)
    }, err => {
      if(onError) onError(err)
    })
  }).catch(err => {
    if(onError) onError(err)
  })
}

export function shelf(){
  
}
export function home(){
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  })
}