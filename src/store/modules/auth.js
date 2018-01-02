import userAPI from '../../api/user.js'

const state = {
  user: null,
  jwt: null
}

const getters = {
  currentUser: (state, getters) => {
    return state.user
  },
  currentJWT: (state, getters) => {
    return state.jwt
  },
  currentUserRoles: (state, getters) => {
    return state.user !== null ? state.user.roles : []
  }
}

const mutations = {
  setCurrentUser (state, payload) {
    state.user = payload
  },
  setCurrentJWT (state, payload) {
    state.user = payload.data
    state.jwt = payload.token
  }
}

const actions = {
  syncCurrentUser ({ commit }) {
    userAPI.get({
      data: { id: state.user.Id },
      success: function (msg) {
        commit('setCurrentUser', msg.data.result)
      },
      fail: function (msg) {
        // TODO: implement
      }
    })

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
