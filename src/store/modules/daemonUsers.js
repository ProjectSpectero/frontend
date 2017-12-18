import userAPI from '../../api/user.js'

const state = {
  users: []
}

const getters = {
  users: state => state.users
}

const mutations = {
  FETCH_USERS (state, users) {
    state.users = users
  }
}

const actions = {
  fetchUsers ({ commit }) {
    userAPI.list({
      success: function (msg) {
        let users = msg.data.result

        // Inject additional temporary fields into user objects
        for (let i = 0; i < users.length; i++) {
          let user = users[i]
          user.status = 'online'
        }

        commit('FETCH_USERS', users)
      },
      fail: function (msg) {
        // TODO: add proper error handling for loading user list
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
