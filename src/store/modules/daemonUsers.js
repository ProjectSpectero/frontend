import userAPI from '../../api/user.js'

const state = {
  users: []
}

const getters = {
  users: state => state.users
}

const mutations = {
  updateUsers (state, users) {
    state.users = users
  }
}

const actions = {
  fetchUsers ({ commit }) {
    userAPI.list({
      success: function (msg) {
        let users = msg.data.result
        for (let i = 0; i < users.length; i++) { // Inject temp fields into user objects
          let user = users[i]
          user.status = 'online'
        }
        commit('updateUsers', users)
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
