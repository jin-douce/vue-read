const store = {
  state: {
    userInfo: null,
    flapCardVisible: false,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],//所有item
    shelfTitleVisible: true,
    shelfCategory: [], // 当前的第二类item
    currentType: 1 // 书架列表为1，书架分组列表为2
  },
  mutations: {
    SET_USER_INFO(state, info){
      state.userInfo = info
    },
    SET_FLAP_CARD_VISIBLE(state, visible) {
      state.flapCardVisible = visible
    },
    SET_IS_EDIT_MODE(state, isEditMode) {
      state.isEditMode = isEditMode
    },
    SET_SHELF_LIST(state, list) {
      state.shelfList = list
    },
    SET_SHELF_SELECTED(state, selected) {
      state.shelfSelected = selected
    },
    SET_SHELF_TITLE_VISIBLE(state, visible) {
      state.shelfTitleVisible = visible
    },
    SET_SHELF_CATEGORY(state, category) {
      state.shelfCategory = category
    },
    SET_CURRENT_TYPE(state, type) {
      state.currentType = type
    }
  }
}

export default store
