const store = {
    state: {
      hotSearchOffsetY: 0,
      flapCardVisible: false
    },
    mutations: {
      SET_HOT_SEARCH_OFFSETY(state, offsetY) {
        state.hotSearchOffsetY = offsetY
      },
      SET_FLAP_CARD_OFFSETY(state, visible) {
        state.flapCardVisible = visible
      }
    }
  }
  
  export default store