import Storage from 'web-storage-cache'

const LocalStorage = new Storage()

export function setLocalStorage(key, value){
    return LocalStorage.set(key, value)
}

export function getLocalStorage(key){
    return LocalStorage.get(key)
}

export function removeLocalStorage(key){
    return LocalStorage.delete(key)
}

export function clearLocalStorage(key){
    return LocalStorage.clear()
}


export function getHome() {
  return getLocalStorage('home')
}

export function saveHome(home) {
  return setLocalStorage('home', home, 1800)
}


// 书架
export function getBookShelf(){
  return getLocalStorage('shelf')
}

export function saveBookShelf(shelf){
  return setLocalStorage('shelf', shelf)
}

// 书签
export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark)
}

//书籍相关：时间、字号、主题、进度
export function getBookObject(fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

export function setBookObject(fileName, key, value) {
  let book = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

  
  export function getReadTime(fileName) {
    return getBookObject(fileName, 'time')
  }
  
  export function saveReadTime(fileName, theme) {
    setBookObject(fileName, 'time', theme)
  }
   
  
  export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
  }
  
  export function saveTheme(fileName, theme) {
    setBookObject(fileName, 'theme', theme)
  }
  
  export function getFontSize(fileName) {
    return getBookObject(fileName, 'fontSize')
  }
  
  export function saveFontSize(fileName, fontSize) {
    setBookObject(fileName, 'fontSize', fontSize)
  }

  export function getCpt(fileName){
    return getBookObject(fileName, 'cpt')
  }

  export function saveCpt(fileName, cpt){
    setBookObject(fileName, 'cpt', cpt)
  }

  export function getPage(fileName){
    return getBookObject(fileName, 'page')
  }

  export function savePage(fileName, page){
    setBookObject(fileName, 'page', page)
  }
  
  
  
