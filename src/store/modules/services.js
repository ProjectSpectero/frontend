import serviceAPI from '../../api/service.js'

const state = {
  list: null
}

const getters = {
  list: state => state.list
}

const actions = {
  fetch: ({ commit }) => {
    serviceAPI.list({
      success: response => {
        console.log('fetching services', response.data)
        commit('UPDATE_SERVICES_LIST', response.data.result)
      },
      fail: error => {
        console.log(error)
      }
    })
  }
}

const mutations = {
  UPDATE_SERVICES_LIST: (state, services) => {
    state.list = services
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
