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

// API wrapper
// Example usage: API('get', '/auth', {authKey: ..., password: ...})
const API = function (method, path, data, success, error) {
  axios({
    method: method,
    baseURL: endpoint,
    headers: {
      Authorization: authCookie !== null ? `Bearer ${authCookie}` : null
    },
    url: path,
    data: data ? data : null
  })
  .then(r => {
    success(r)
  })
  .catch(e => {
    error(e)
  })
}

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

    API('post', '/auth', {
      authKey: options.username,
      password: options.password
    }, function (response) {
      response = response.data

      // Login successful, JWT token issued
      if (response.message === 'JWT_TOKEN_ISSUED') {
        setCookie('SPECTERO_AUTH', response.result, 1) // TODO: modify 1 day expiry
        return success()
      }

      // 200 status code recieved, but JWT token wasn't issued
      return fail(`Unknown error occurred.`)

    }, function (error) {

      if (error.response === undefined) {
        return fail(`Unknown error occurred.`)
      }

      let response = error.response.data
      let errorMsg = null

      switch (response.errors[0]) {
        case 'MISSING_BODY':
          errorMsg = `Missing username or password.`
          break
        case 'USER_NOT_FOUND':
        case 'MISSING_OR_INVALID_PASSWORD':
        case 'AUTHENTICATION_FAILED':
          errorMsg = `Invalid username or password.`
          break
        default:
          errorMsg = `Unknown error occurred.`
      }

      return fail(errorMsg)

    })

  }
}