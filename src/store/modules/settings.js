const state = {
  layout: 'main'
}

const getters = {
  layout: (state) => state.layout
}

const actions = {
  switchLayout: ({ commit }, layout) => {
    commit('SWITCH_LAYOUT', layout || 'main')
  },
}

const mutations = {
  SWITCH_LAYOUT: (state, layout) => {
    state.layout = layout
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
