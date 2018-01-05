const state = {
  layout: 'master'
}

const getters = {
  layout: (state) => state.layout
}

const actions = {
  switchLayout: ({ commit }, layout) => {
    commit('SWITCH_LAYOUT', layout || 'master')
  }
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
