const book = {
    state: {
      titleList:[],
      currentPage: 0,
      currentCpt: 1,
      fileName: '',
      menuVisible: false,
      settingVisible: -1,  //-1：不显示  0：字体  1：主题  2：进度  3：目录
      defaultFontSize: 20,
      defaultFontFamily: 'Default',
      fontFamilyVisible: false,
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
      'PRE_CPT': (state) => {
        if (state.currentCpt <= 1) {
          return false;
        } else {
            state.currentCpt--;
        }
      },
      'NEXT_CPT': (state, max) => {
        if (state.currentCpt > max) {
          return false;
        } else {
            state.currentCpt++;
        }
      },
      'PREV_PAGE': (state) => {
            state.currentPage--;
      },
      'NEXT_PAGE': (state) => {
            state.currentPage++;
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
      'SET_DEFAULT_FONT_FAMILY': (state, font) => {
        state.defaultFontFamily = font
      },
      'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
        state.fontFamilyVisible = visible
      },
      'SET_DEFAULT_THEME': (state, theme) => {
        state.defaultTheme = theme
      },
 
      'SET_PROGRESS': (state, progress) => {
        state.progress = progress
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