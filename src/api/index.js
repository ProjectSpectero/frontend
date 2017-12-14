/* eslint-disable */ // TODO: remove

// TODO: create auth wrapper to delete SPECTERO_AUTH cookie if 401 from request

import axios from 'axios'
import { setCookie, getCookie } from 'tiny-cookie'

let endpoint = `${process.env.DAEMON_HTTPS ? 'https://' : 'http://'}${process.env.DAEMON_ENDPOINT ? process.env.DAEMON_ENDPOINT : 'localhost'}${process.env.DAEMON_PORT ? ':' + process.env.DAEMON_PORT : ''}/v1`
let authCookie = getCookie('SPECTERO_AUTH')

const HTTP = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: authCookie !== null ? `Bearer ${authCookie}` : null
  }
})

export default {
  
  /**
   * Login
   * 
   * options:  array of authorization options (authKey, password)
   * success:  callback function for successful login
   * fail:     callback function for failed login
   * 
   * TODO: add authorization header and route redirect to /dashboard on successful login
   * TODO: add promise to API call to allow for .then() for code that needs to always run (ie: re-enabling login form)
   */
  login: function (options, success, fail) {
    HTTP.post(`${endpoint}/auth`, {
      authKey: options.authKey,
      password: options.password
    })
    .then(r => {
      let response = r.data

      // Login successful
      if (response.message === 'JWT_TOKEN_ISSUED') {
        setCookie('SPECTERO_AUTH', response.result, 1) // TODO: modify 1 day expiry
        return success()
      }

      // 200 status code, but not JWT_TOKEN_ISSUED message
      return fail(`Unknown error occurred.`)
    })
    .catch(e => {
      if (e.response === undefined) {
        return fail(`Unknown error occurred.`)
      }

      let response = e.response.data
      let error = null

      switch (response.errors[0]) {
        case 'MISSING_BODY':
          error = `Missing username or password.`
          break
        case 'USER_NOT_FOUND':
        case 'MISSING_OR_INVALID_PASSWORD':
        case 'AUTHENTICATION_FAILED':
          error = `Invalid username or password.`
          break
        default:
          error = `Unknown error occurred.`
      }

      return fail(error)
    })
  }
}
