import userAPI from '../../api/user.js'

const state = {
  users: []
}

const getters = {
  list: state => state.users,
  usernameRules: () => ({ required: true, max: 50, regex: /^[a-zA-Z][\w]*$/ })
}

const actions = {
  fetch ({ commit }) {
    userAPI.list({
      success: function (response) {
        const users = response.data.result

        for (let i = 0; i < users.length; i++) { // Inject temp fields into user objects
          let user = users[i]
          user.status = 'online'
        }

        commit('UPDATE_USERS', response.data.result)
      },
      fail: function (error) {
        console.log(error)
        // TODO: implement
      }
    })
  }
}

const mutations = {
  UPDATE_USERS (state, users) {
    state.users = users
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
