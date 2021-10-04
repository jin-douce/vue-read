const book = {
  titleList: state => state.book.titleList,
  currentPage: state => state.book.currentPage,
  currentCpt: state => state.book.currentCpt,
  fileName: state => state.book.fileName,
  menuVisible: state => state.book.menuVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  defaultTheme: state => state.book.defaultTheme,
  offsetY: state => state.book.offsetY,
  isBookmark: state => state.book.isBookmark,
  flapCardVisible: state => state.store.flapCardVisible,
  isEditMode: state => state.store.isEditMode,
  shelfList: state => state.store.shelfList,
  shelfSelected: state => state.store.shelfSelected,
  shelfTitleVisible: state => state.store.shelfTitleVisible,
  shelfCategory: state => state.store.shelfCategory,
  currentType: state => state.store.currentType,
  userInfo: state => state.store.userInfo
}

export default book
