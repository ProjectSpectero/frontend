import api from './index.js'
import { setCookie } from 'tiny-cookie'

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
    api('post', '/auth', {
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

      if (error === undefined) {
        return fail(`Unknown error occurred.`)
      }

      let errorMsg = null

      switch (error.data.errors[0]) {
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
