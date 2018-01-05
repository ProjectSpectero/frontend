import userAPI from '../../api/user.js'

const state = {
  users: []
}

const getters = {
  users: state => state.users,
  usernameRules: () => {
    return { required: true, max: 50, regex: /^[a-zA-Z][\w]*$/ }
  }
}

const actions = {
  fetchUsers ({ commit }) {
    userAPI.list({
      success: function (response) {
        const users = response.data.result

        for (let i = 0; i < users.length; i++) { // Inject temp fields into user objects
          let user = users[i]
          user.status = 'online'
        }

        commit('UPDATE_USERS', response.data.result)
      },
      fail: function (response) {
        console.log(response)
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
  state,
  getters,
  mutations,
  actions
}
