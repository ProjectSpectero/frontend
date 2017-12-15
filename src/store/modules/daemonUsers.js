const state = {
  tasks: [
    
  ]
}

const getters = {
  tasks: state => state.tasks
}

const mutations = {
  addTask (state, task) {
    state.tasks.push(task)
  }


  // DECREMENT_MAIN_COUNTER (state) {
  //   state.main--
  // },
  // INCREMENT_MAIN_COUNTER (state) {
  //   state.main++
  // }
}

const actions = {
  // someAsyncTask ({ commit }) {
  //   // do something async
  //   commit('INCREMENT_MAIN_COUNTER')
  // }
  // getTasks ({ commit }, options) {

  //   // console.log(`store/modules/Tasks.js getTasks CALLED`)

  //   return state.tasks

  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
