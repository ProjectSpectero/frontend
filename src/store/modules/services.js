import serviceAPI from '../../api/service.js'

const state = {
  services: null,
  ips: null
}

const getters = {
  services: state => state.services,
  ips: state => state.ips
}

const actions = {
  fetch: ({ commit }) => {
    serviceAPI.list({
      success: response => {
        console.log('Fetched list')
        commit('UPDATE_SERVICES_LIST', response.data.result)
      },
      fail: error => {
        console.log(error)
      }
    })
  },
  start: ({ dispatch }, service) => {
    serviceAPI.manage({ name: service, action: 'start' }, {
      // Not implemented yet
      success: response => {
        dispatch('fetch')
      },
      fail: error => {
        console.log(error)
      }
    })

    setTimeout(() => { dispatch('fetch') }, 1000)
  },
  stop: ({ dispatch }, service) => {
    serviceAPI.manage({ name: service, action: 'stop' }, {
      // Not implemented yet
      success: response => {
        console.log('Stopped ', service, ' with response', response)
        dispatch('fetch')
      },
      fail: error => {
        console.log(error)
      }
    })

    setTimeout(() => { dispatch('fetch') }, 1000)
  },
  fetchIps: ({ commit }) => {
    serviceAPI.ips({
      success: response => {
        commit('UPDATE_IP_LIST', response.data.result)
      },
      fail: error => {
        console.log(error)
      }
    })
  }
}

const mutations = {
  UPDATE_SERVICES_LIST: (state, services) => {
    state.services = services
  },

  UPDATE_IP_LIST: (state, ips) => {
    state.ips = ips
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
