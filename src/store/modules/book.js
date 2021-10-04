const book = {
    state: {
      titleList:[],
      currentPage: 0,
      currentCpt: 1,
      fileName: '',
      menuVisible: false,
      settingVisible: -1,  //-1：不显示  0：字体  1：主题  2：进度  3：目录
      defaultFontSize: 20,
      defaultTheme: {
        name: 'default',
        bgc: '#fff'
      },
      offsetY: 0,
      isBookmark: null,      
    },
    mutations: {
      'SET_TITLE_LIST': (state, list) => {
        state.titleList = list
      },
      'SET_CURRENT_CPT': (state, currentCpt) => {
        state.currentCpt = currentCpt
      },
      'SET_CURRENT_PAGE': (state, currentPage) => {
        state.currentPage = currentPage
      },
      'SET_FILENAME': (state, fileName) => {
        state.fileName = fileName
      },
      'SET_MENU_VISIBLE': (state, visible) => {
        state.menuVisible = visible
      },
      'SET_SETTING_VISIBLE': (state, visible) => {
        state.settingVisible = visible
      },
      'SET_DEFAULT_FONT_SIZE': (state, fontSize) => {
        state.defaultFontSize = fontSize
      },
      'SET_DEFAULT_THEME': (state, theme) => {
        state.defaultTheme = theme
      },
      'SET_OFFSETY': (state, offsetY) => {
        state.offsetY = offsetY
      },
      'SET_IS_BOOKMARK': (state, isBookmark) => {
        state.isBookmark = isBookmark
      },
    }
 
}

export default book