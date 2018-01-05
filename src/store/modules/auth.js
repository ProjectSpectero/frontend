import userAPI from '../../api/user.js'

const state = {
  user: null,
  jwt: null
}

const getters = {
  currentUser: (state) => {
    return state.user
  },
  currentJWT: (state) => {
    return state.jwt
  },
  currentUserRoles: (state) => {
    return state.user !== null ? state.user.roles : []
  },
  isSuperAdmin: (getters) => {
    return getters.currentUserRoles ? getters.currentUserRoles.indexOf('SuperAdmin') > -1 : false
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
      data: { id: state.user.id },
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
