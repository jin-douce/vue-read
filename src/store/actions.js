const actions = {
  setTitleList({commit}, list){
    return commit('SET_TITLE_LIST', list)
  },
  preCpt({commit}) {
    return new Promise((resolve, reject) => {
        resolve(true);
        commit('PRE_CPT')
    })
  },
  nextCpt({commit}, max) {
      return new Promise((resolve, reject) => {
          resolve(true);
          commit('NEXT_CPT', max)
      })
  },
  prevPage({commit}) {
    return new Promise((resolve, reject) => {
        resolve(true);
        commit('PREV_PAGE')
    })
  },
  nextPage({commit}, max) {
      return new Promise((resolve, reject) => {
          resolve(true);
          commit('NEXT_PAGE', max)
      })
  },
  setCurrentCpt: ({commit}, cpt) => {
    return commit('SET_CURRENT_CPT', cpt)
  },
  setCurrentPage: ({commit}, page) => {
    return commit('SET_CURRENT_PAGE', page)
  },
  setFontFamilyVisible: ({ commit }, visible) => {
    return commit('SET_FONT_FAMILY_VISIBLE', visible)
  },
  setDefaultFontFamily: ({ commit }, font) => {
    return commit('SET_DEFAULT_FONT_FAMILY', font)
  },
  setDefaultFontSize: ({ commit }, fontSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', fontSize)
  },
  setSettingVisible: ({ commit }, visible) => {
    return commit('SET_SETTING_VISIBLE', visible)
  },
  setMenuVisible: ({ commit }, visible) => {
    return commit('SET_MENU_VISIBLE', visible)
  },
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setDefaultTheme: ({ commit }, theme) => {
    return commit('SET_DEFAULT_THEME', theme)
  },
  
  setIsBookmark({ commit }, isBookmark) {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setOffsetY({ commit }, offsetY) {
    return commit('SET_OFFSETY', offsetY)
  },
  setHotSearchOffsetY({ commit }, offsetY) {
    return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
  },
  setFlapCardVisible({ commit }, flapCardVisible) {
    return commit('SET_FLAP_CARD_VISIBLE', flapCardVisible)
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList({ commit }, list) {
    return commit('SET_SHELF_LIST', list)
  },
  setShelfSelected({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected)
  },
  setShelfTitleVisible({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible)
  },
  setShelfCategory({ commit }, category) {
    return commit('SET_SHELF_CATEGORY', category)
  },
  setCurrentType({ commit }, type) {
    return commit('SET_CURRENT_TYPE', type)
  },
  setUserInfo({ commit }, info){
    return commit('SET_USER_INFO', info)
  }
}

export default actions
